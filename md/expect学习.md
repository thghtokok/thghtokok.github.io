# Expect脚本
## 特点: 

1. 人机交互的自动实现方式
1. 以获取期待得到的输出为交互手段, 故而应该对对方输出有全面的掌控.
2. 基于TCL
3. 适用于编写telnet , ssh , ftp , sftp等远程访问协议的自动化脚本
	
## 基本语法:

```shell
#!/usr/bin/expect
set timeout 30  #expect的内部变量 单位是秒, 等待相应时间,如果超时就自动退出
set variable [lindex $argv 0] #获得第一个脚本参数
spawn ssh -l test 192.168.1.1 #开启一个进程 使用ssh连接远程计算机
expect "password:" #捕获进程输出
send "$variable\r" #发送信息 \r是回车
expect -re "~$*"  #-re 采用正则表达式捕获信息
send "/home/test/a.sh\r"
expect -re ".*$"
send "exit\n"
expect eof  #结束子进程
exit   #结束expect脚本
```

### 变量的声明和赋值语句

set 变量名 变量值

### 使用变量的值

$变量名

### 获取脚本的调用参数

[lindex $argv 0] 第一个参数  
[lindex $argv 1] 第二个参数
[lindex $argv 2] 第三个参数

### expect的内部调用参数

* expect 捕获系统输出信息 -re 使用正则表达式捕获
* send 发送信息给系统
* spawn 开启新的进程
* lindex 获取脚本参数?

### expect的分支语法  注意格式,否则会报错

```shell
if {"$test"=="apple"} {
set variable "$test"
} else {
set variable "not apple"
}
```

### expect的循环语句

```shell
for {set i 0} {$i<4} {incr i}
	{puts "$i"}
```
* incr i 表示i++


## Expect简历



