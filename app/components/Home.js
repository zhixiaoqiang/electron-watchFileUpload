/* eslint-disable class-methods-use-this */
/* eslint-disable promise/always-return */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { remote } from 'electron'
import chokidar from 'chokidar'
// import fs from 'fs-extra'
import FormData from 'form-data'
import Button from '@material-ui/core/Button';
import rp from 'request-promise'
import canvas2Buffer from '../utils/canvas2buffer'
import Table from './table';
import Input from './input';
import Modal from './modal';
import styles from './Home.css'


export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messageLogger: '',
      startDisabled: false,
      nickName: localStorage.getItem('nickName') || ''
    }
    this.watcher = null;
    this.showInLogFlag = false; // 是否显示在log中
  }

  setNickName (nickName) {
    this.setState({nickName})
  }

  StartWatcher = (path) => {
    // Must use destructuring state assignment
    const curThis = this
    const { nickName } = this.state
    localStorage.setItem('nickName', nickName)
    this.setState({
      startDisabled: true,
      messageLogger: '扫描中, 请等待 ...'
    })
    curThis.watcher = chokidar.watch(path, {
        // eslint-disable-next-line no-useless-escape
        ignored: /[\/\\]\./,
        persistent: true
    });

    const onWatcherReady = () => {
        console.info('From here can you check for real changes, the initial scan has been completed.');
        curThis.showInLogFlag = true;
        curThis.setState({
          showStop: true,
          messageLogger: `正在监听 ${path} 文件夹`
        })
    }

    curThis.watcher
    .on('add', (path, event) => {
        if(curThis.showInLogFlag){
          curThis.addLog({
            typeStr: '新增文件',
            path,
            type: 'new'
          })
          curThis.uploadFile(path)
        }
    })
    .on('addDir', (path) => {
          console.log('Directory', path, 'has been added');

          if(curThis.showInLogFlag){
              curThis.addLog({
                typeStr: '新增文件夹',
                path,
                type: 'new'
              })
          }
    })
    .on('change', (path) => {
        console.log('File', path, 'has been changed');

        if(curThis.showInLogFlag){
            // curThis.addLog({
            //   typeStr: '文件变更',
            //   path,
            //   type: 'change'
            // })
        }
    })
    .on('unlink', (path) => {
        console.log('File', path, 'has been removed');

        if(curThis.showInLogFlag){
            // curThis.addLog({
            //   typeStr: '删除文件',
            //   path,
            //   type: 'delete'
            // })
        }
    })
    .on('unlinkDir', (path) => {
        console.log('Directory', path, 'has been removed');

        if(curThis.showInLogFlag){
            curThis.addLog({
              typeStr: '删除文件夹',
              path,
              type: 'delete'
            })
        }
    })
    .on('error', (error) => {
        console.log('Error happened', error);

        if(curThis.showInLogFlag){
            curThis.addLog({
              typeStr: '文件错误',
              path,
              type: 'delete'
            })
            console.log(error);
        }
    })
    .on('ready', onWatcherReady)
    .on('raw', (event, path, details) => {
        // This event should be triggered everytime something happens.
        // console.log('Raw event info:', event, path, details);
    });
  }

  startHandle (e) {
    const { nickName } = this.state
    if (!nickName) {
      return this.setState({
        showStartModal: true
      })
    }

    e.stopPropagation();
    const { dialog } = remote;
    dialog.showOpenDialog({
        properties: ['openDirectory']
    },(path) => {
        if(path){
            this.StartWatcher(path[0]);
        }else {
            console.log("No path selected");
        }
    });
  }

  stopHandle (e) {
    e.stopPropagation();
    if(!this.watcher){
        console.log("You need to start first the watcher");
    }else{
        this.watcher.close();
        this.showInLogFlag = false;
        this.setState({
          startDisabled: false,
          messageLogger: '没有正在监听的文件夹'
        })
    }
  }

  resetHandle () {
    const { resetFileLog } = this.props
    resetFileLog()
  }

  // 添加日志
  addLog ({ typeStr, type, path }) {
    // eslint-disable-next-line prefer-const
    let { setFileLog } = this.props
    const curLog = {
      text: path,
      state: typeStr,
      type,
      color: 'green'
    }
    if (type === 'delete') {
      curLog.color = 'red'
    } else if (type === "change"){
      curLog.color = 'red'
    } else {
      curLog.color = 'green'
    }
    setFileLog(curLog)
  }

  getCompressFile (path) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = document.createElement('img')
      img.src = path
      // const file = ''
      img.onload = () => {
        ctx.canvas.width = img.width
        ctx.canvas.height = img.height
    
        ctx.drawImage(img, 0, 0, img.width, img.height)
        canvas.toBlob((blob) => {
          const file = new File([blob], path, { lastModified: new Date().getTime(), type: 'image/jpeg' })
          resolve(file)
        }, 'image/jpeg', 0.1)
      }
    })
  }

  async uploadFile (path) {
    const { nickName } = this.state
    const { setFileLogResult } = this.props
    const form = new FormData()
    // const file = await this.getCompressFile(path)
    // const file = await fs.createReadStream(path)
    const file = await canvas2Buffer(path, 'image/jpeg', 0.1)
    console.warn(file)
    // form.append('name', name)
    console.warn(form)
    // form.append('nickName', nickName)
    // form.append('file', file);

    const formData = {
      file,
      name: nickName,
      nickName
    }

    setFileLogResult({path, message: '发票识别中'})

    console.warn(rp({
      method: 'POST',
      headers: form.getHeaders(),
      uri: 'http://zdocker6.dian.so/invoice/validate/autoUpload',
      formData,
      // body: formData,
      json: true
    }))

    rp({
      method: 'POST',
      headers: form.getHeaders(),
      uri: 'http://zdocker6.dian.so/invoice/validate/autoUpload',
      formData,
      // body: formData,
      json: true
    }).then(res => {
      console.warn(res)
      this.successRes(res)
      .then(result => {
        setFileLogResult({path, message: result})
      })
      .catch(result => {
        setFileLogResult({path, message: result.message})
      })
    })
    .catch(err => {
      this.errorRes(err).catch(result => {
        setFileLogResult({path, message: result.message})
      })
    })
  }

  successRes (data) {
    return new Promise((resolve, reject) => {
      const defaultError = {
        message: '未知错误',
        code: -1
      }
      if (!data) reject(defaultError)
      if (!data.success) {
        const error = {
          message: data.msg,
          code: data.state
        }
        reject(error)
      }
      resolve(data.data)
    })
  }

  errorRes (err) {
    const errorMsgMap = {
      404: '请求地址有误。',
      500: '服务器错误。',
      502: '网关错误。'
    }
    return new Promise((resolve, reject) => {
      if (err.code === 'ECONNABORTED') {
        const error = {
          message: '请求超时',
          code: err.code
        }
        reject(error)
      }
      if (err.response) {
        const error = {
          message: errorMsgMap[err.response.status],
          code: err.code
        }
        reject(error)
      } else {
        reject(err.message)
      }
    })
  }

  render () {
    const { startDisabled, messageLogger, showStartModal, nickName } = this.state
    const { fileLog } = this.props
    return (
      <div className={styles.container} data-tid="container">
        <h1>监听文件变更后自动上传</h1>
        <div>
          <Input
            label='花名'
            value={nickName}
            disabled={startDisabled}
            onChange={(e) => this.setNickName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => this.startHandle(e)}
            disabled={startDisabled}
          >选择要监听的文件夹</Button>
          <Button
            variant="contained"
            disabled={!startDisabled}
            onClick={(e) => this.stopHandle(e)}
          >停止监听</Button>
          <Button
            variant="contained"
            disabled={!fileLog}
            onClick={(e) => this.resetHandle(e)}
          >重置消息</Button>
        </div>
        <span>{messageLogger}</span>
        {fileLog && <Table data={fileLog} />}

        <Modal
         title='提示'
         open={!!showStartModal}
         handleClose={() => this.setState({showStartModal: false})}
         okText='我知道了'
        >
          请填写花名后再操作
        </Modal>

      </div>
    )
  }
}
