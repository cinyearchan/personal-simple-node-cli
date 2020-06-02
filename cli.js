#!/usr/bin/env node

// Node CLI 应用入口文件必须要有上述文件头
// 如果是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// chmod 755 cli.js

console.log('cli working!')

/**
 * 脚手架工作过程
 * 1. 通过命令行交互询问用户问题
 * 2. 根据用户回答的结果生成文件
 *
 */

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
])
  .then(answers => {
    // console.log(answers)
    // this.answers = answers

    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()

    // 将模板下的文件全部转换到目标目录
    fs.readdir(tmplDir, (err, files) => {
      if (err) throw err
      files.forEach(file => {
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
          if (err) throw err

          // 将结果写入目标文件路径
          fs.writeFileSync(path.join(destDir, file), result)
        })
      })
    })
  })