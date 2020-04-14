# Lua的学习笔记

对程序效率的测试！
```lua
x = os.clock()     --开始计时
print(os.time())   --可有可无的时间戳
for i=1 ,10000000 do  --运行次数
--a(event)  --函数A
b(event)   --函数B
end
print(string.format("elapsed time: %.2f\n" , os.clock() - x))  --展示结果
```

## Hello World

```lua
print("Hello World")
```
> Hello World

* 输入数字，求得该数字的阶乘

```lua
function fact(n)
     if n==0 then
          return 1
     else
          return n*fact(n-1)
     end
end

print("enter a number:")
a = io.read("*number")
print(fact(a))
```

> enter a number:
> 5
> 120

* 一行中可以写多个等式，中间不需要加分号，但是建议加分号

```lua
a=1 b=a*2
print(a,b) --这样显示系统会自动加\t
```
> 1     2

* 在程序中使用dofile("文件A")来把文件A包含到当前文件中。 

```lua
--file 'a.lua'
--求斜边长
function norm (x,y)
     local n2 = x^2 + y^2
     return math.sqrt(n2)
end

--求倍数
function twice(x)
     return 2*x
end
--file 'b.lua'
dofile("a.lua")
n=norm(3,4)
print(twice(n))
```

>10
 
* 全局变量在没有赋值之前是nil类型，
  * 一个变量只有不等于nil的时候才是存在的

```lua
print(b)
b=10
print(b)
```
> nil
> 10


## 标示符：
* 字母、下划线、数字的序列，数字不能开头
* 不建议使用下划线和大写字母，以内Lua的保留字也是这样的。
* 保留字不能当做表示符

| 保留字   | 备注                               |
| -------- | ---------------------------------- |
| and      | 假返回假 真返回值 两个都是真       |
| break    |
| do       |
| else     | 否则                               |
| elseif   | 否则如果                           |
| end      |
| false    | 假                                 |
| for      |
| function | 定义函数                           |
| if       | 如果                               |
| in       |
| local    | 创建局部变量                       |
| nil      |
| not      | 逻辑反                             |
| or       | 真返回真值 假返回值 只要有一个是真 |
| repeat   |
| return   | 返回                               |
| then     |
| true     | 真                                 |
| until    |
| while    |


### Lua是大小写敏感的
### 单行注释： --
### 多行注释：--[[    --]]

### 命令行方式

```shell
lua [options] [script[args]]
-e 直接报命令传入Lua
D:\StudentFile\Luaxuexi>lua -e "print(math.sin(12))"
-0.53657291800043
-l  L  加载文件，就是把几个文件连起来
-i  进入交互模式
_PROMPT 可以改变交互模式的提示符
lua -i -e "_PROMPT=' Lua>'"
D:\StudentFile\Luaxuexi>lua -i -e "_PROMPT=' Lua>'"
Lua 5.1.4  Copyright (C) 1994-2008 Lua.org, PUC-Rio
Lua>
```

### Lua是动态类型语言，变量不要类型定义
有8中基本类型

| 类型     | 备注                                      |
| -------- | ----------------------------------------- |
| nil      | 为赋值的全局变量                          |
| boolean  | true、false、除了false和nil其他的值都是真 |
| number   | 所有的数都是实数  4.57e-3                 |
| string   | 用单引号，或者双引号括起来的              |
| userdata | 外来数据类型                              |
| function | 可以存入变量                              |
| thread   |
| table    |

* type()函数可以得到变量或者常量的类型
```lua
print(type(b))
print(type(true))
print(type(10.4*3))
print(type("true"))
print(type(print))
```
> nil
> boolean
> number
> string
> function

虽然一个变量可以存储多种类型，但是不建议使用会造成混乱。
Strings
b=string.gsub(a,"one","another")
把变量a中的one换成another后复制给变量b
string类型可以存储大量的数据
字符串一旦创建就不能修改，要修改只能建立新的字符串
从控制台输入信息：

```lua
print("请输入信息");
a = io.read("*number")
print(a)
```
> 请输入信息
> 6
> 6

### 转义字符

| 转义字符 | 备注                   |
| -------- | ---------------------- |
| \a       | bell                   |
| \b       | back space	后退        |
| \f       | form feed	换页         |
| \n       | newline	换行           |
| \r       | carriage return	回车   |
| \t       | horizontal tab	制表    |
| \v       | vertical tab           |
| \\       | backsllash	\           |
| \"       | double quote	"         |
| \'       | single quote	'         |
| \[       | left square bracket	[  |
| \]       | right square bracket	] |

```lua
print("one line\nnext line\n\"in quotes\",'in quotes'")
print('a backslash inside quotes:\'\\\'')
print("a simpler way:'\\'")
```

> one line
> next line
> "in quotes",'in quotes'
> a backslash inside quotes:'\'
> a simpler way:'\'

* 使用\ddd(ddd为三位十进制数字)方式表示字母。
```lua
print("alo\n123\"")
print('\97lo\10\04923"')
```
> alo
> 123"
> alo
> 123"
* 多行字符串 [[ ... ]] 不会解释转义字符，但是似乎不能被嵌套（书上说可以，但测试不可以）
Lua会自动将string类型转换为number类型
但是如果string不是数字就会报错

```lua
print("10"+1)
print("10"+"1")
print("10+1")
print("hello"+1)
```

> 11
> 11
> 10+1
> lua: b.lua:4: attempt to perform arithmetic on a string value

* **注意： 10 == "10" 是false**
把string转换成number
tonumber()  如果字符串不是数字，返回nil

```lua
line = io.read()
n = tonumber(line)
if n == nil then
     error(line .. " is not a valid number")
else
     print(n*2)
end
```

> d
> lua: b.lua:4: d is not a valid number

* error()函数在控制台以报错的形式显示信息
把number转换成string
tostring()

```lua
print(10 == "10")
print(tostring(10)=="10")
print(10 .. "" == "10")
```

> false
> true
> true

* .. 是把连个字符串连接起来，类似于java中的10+""
  * **注意：..跟在数字后面的时候要有空格，避免出错。**

### 2.5 Functions
函数式第一类值（和其他变量相同），意味着函数可以存储在变量中，可以作为函数的参数，可以作为函数的返回值。
Lua可以调用lua或者C实现的函数，Lua所有标准库都是用C实现的。
标准库包括string库、table库、I/O库、OS库、算术库、debug库

### 2.6 Userdata and Threads
userdata可以将C数据存放在Lua变量中，userdata在Lua中除了赋值和相等比较外，没有预定义的操作。
userdata用来描述应用程序或者使用C实现的库创建的新类型。
例如：用标准I/O库来描述文件

## 第三章 表达式
### 3.1 算术运算符

二元运算符: + - * / ^ (加减乘除幂)
一元运算符：-  (负值)
这些运算符的操作数都是实数

### 3.2 关系运算符
<  >  <=  >=  == ~=
返回结构为false或者true
==  和  ~=  比较两个值，如果两个值类型不同，Lua认为两者不同
nil之和自己相等
Lua比较引用类型如tables、userdata、functions时，只有当且仅当两者表示同一个对象时才相等

```lua
print(nil == nil)
print(nil == print)
print("abc">"cde")
a = {}; a.x =1; a.y=0
b = {}; b.x =1; b.y=0
c=a
print(a==c,a~=b)
```

> true
> false
> false
> true     true

Lua比较数字按传统的数字大小进行
比较字符串按照字母的顺序进行，但是字母顺序依赖本地环境
比较不同类型的值是要特别注意

```lua
print("0" == 0)  --不同类型相等一律false
print(2<15)  --数字大小比较
print("2">"15")  --字符串顺序比较
print(2>"15")  --不同类型比较一律报错
```
> false
> true
> true
> lua: b.lua:4: attempt to compare string with number

### 3.3 逻辑运算符
and  or  not
1. 认为false和nil是假（false）,其他的都是真，0也是真
* **注意：and和or的运算结果不是true和false，而是两个操作数之中的一个**

and和or的返回规则：
* a and b  --如果a为false，则返回a，否则返回b
* a or b --如果a为true，则返回a，否则返回b
例如：
```lua
print(3 and 5) --3是真 and 返回5
print(nil and 5) --nil是假 and 返回nil
print(false and 5) --false是假 and 返回false
print(4 or 5)  --4是真 or 返回4
print(false or 5)  --flase是假 or 返回5
```
> 5
> nil
> false
> 4
> 5

#### 小技巧：
> x = x or v  --单例模式
> 等价于
> if not x then
>    x = v
> end

* **注意 ： and 的优先级 比 or 高**

* C语言中的三元运算符
a ? b : c
在Lua中可以这样实现
a and b or c
解释：如果a是真，返回b，否则返回c

```lua
a=false
b=4
c=8
print(a and b or c)
```
> 如果a是false，返回8
> 如果a是true，返回4

* not的结果一直返回false和true
就是逻辑取反

### 3.4 连接运算符
* ..  --两个点
字符串的连接，如果操作数为数字，Lua将数字转成字符串
```lua
print("Hello " .. "world")
print(0 .. 1)
```
> Hello world
> 01
* **注意，在数字后面使用时，需要在数字后面加空格。**

### 3.5 优先级
从高到低的顺序：
| 顺序 | 运算符              | 说明         |
| ---- | ------------------- | ------------ |
| 高   | ^                   | 幂           |
|      | not  -              | 逻辑反，负值 |
|      | %                   | 取余         |
|      | *    /              | 乘   除      |
|      | +  -                | 加   减      |
|      | ..                  | 连接符       |
|      | <  > <=  >=  ~=  == | 关系运算符   |
|      | and                 |
| 低   | or                  |

```lua
print ( 5^6 %3 , 5^ 6, 15625% 3)   --说明^的优先级比%高
print ( 6%3 ^5 , 6% 3)
```
> 1        15625 1
> 6        0
```lua
print ( 5*6 %3 )   --说明%的优先级比* , /高
print ( 6%3 *5 )
```
> 0
> 0
```lua
print (- 1 % 5)  --说明not ,符号 的优先级比%高
print (- ( 1 % 5))
```
> 4
> -1

* 除了^和..外所有的二元运算符都是左连接
左连接，先算左边，再算右边
右联接，先算右边，再算左边

### 3.6 表的结构
构造器是创建和初始化表的表达式。表是Lua特有的工恩能够强大的东西。
最简单的构造函数式{}，用来创建一个空表。
可以直接初始化数组

--定义一个数组
days = {"星期1","星期2","星期3","星期4","星期5","星期6","星期7"}
print(days[1])

* Lua中的数组第一个元素是1

构造函数可以使用任何表达式初始化
tab = {print(1),math.sin(2),math.sin(4)}
还可以把数组定义成一个实例一样的东西

tab = {x=1,y=2} 
--或者写成 tab = {}; a.x=1;a.y=2
print(tab.x)

Lua的数组定义以后结构仍然可以改变！
```lua
tab = {x=1,y=2}
tab.a = 15
tab[1] ="abc"
print(tab[1])
print(tab[2])
print(tab[3])
print(tab[4])
print(tab.x)
print(tab.y)
print(tab.a)
```
> abc
> nil
> nil
> nil
> 1
> 2
> 15

这里例子显示，Lua里的表和数组差异很大
使用下标并不能访问全部数据，定义的时候如何定义，使用的时候就要如何使用
Lua的表可以总称多维的。
```lua
w = {x = 0, y = 0 , label="console"}
x = {math.sin(0),math.sin(2),math.sin(4)}
w[1] = "another field"
x.f=w
print(w["x"])
print(w[1])
print(x.f[1])
w.x = nil   --删掉一个元素
```

每次调用构造函数，Lua都会创建一个新的table ，可以使用table构造一个list链表
```lua
--制造链表，输入quit结束
list = nil
for line in io.lines() do
     if line == "quit" then break end
     list = {next = list , value = line}
end
--输出链表
l = list
while l do
     print(l.value)
     l = l.next
end
```
> 1
> 2
> 3
> 4
> 5
> quit
> 5
> 4
> 3
> 2
> 1

```lua
--进化型：头指针和尾指针
listH = nil
listW = nil
a = 1
for line in io.lines() do
     if line == "quit" then break end

     listW = {last = listW, value = line,next = nil}
     if listW.last ~= nil then
          listW.last.next = listW
     end
     if a == 1 then
          listH = listW
          a = 2
     end
end
print("从头开始")
l = listH
while l do
     print(l.value)
     l = l.next
end
print("从尾开始")
l = listW
while l do
     print(l.value)
     l = l.last
end
```

> a
> b
> c
> quit
> 从头开始
> a
> b
> c
> 从尾开始
> c
> b
> a

在同一个构造函数中，可以混合列表风格和record风格进行初始化
```lua
polyline = {
color = "blue", thickness = 2, nopints = 4,
{name = "郭海涛", gender = 29},
{name = "王庚", gender = 30},
{name = "奥特曼", gender = 21},
{name = "怪兽", gender = 24},
{name = "马克思", gender = 23},
{name = "拿破仑", gender = 28},
{name = "希特勒", gender = 21}
}

i = 1
while polyline[i] do
     print(polyline[i].name,polyline[i].gender)
     i = i+1
end
```

> 郭海涛     29
> 王庚     30
> 奥特曼     21
> 怪兽     24
> 马克思     23
> 拿破仑     28
> 希特勒     21

从这个例子来看，还真有点像表格。
使用自定义索引初始化一个表中的元素

```lua
--自定义索引可以是字符串
opnames = {
["+"] = "add",
["-"] = "sub",
["*"] = "mul",
["/"] = "div"
}
print(opnames["+"])

--自定义索引可以是负值
i = -2; s = "-"
a = {
[i+0]=s,
[i+1]=s .. s,
[i+2]=s .. s .. s,
[i+3]=s .. s .. s ..s
}
print(a[-1])
```
> add
> --

list风格初始化和record风格初始化是这种一般初始化的特例：
```lua
{x=0,y=0}	{["x"]=0,["y"]=0}
{"red","green","blue"}	{[1]="red",[2]="green",[3]="blue"}
```
* 如果真的想要数组下标从0开始：
```lua
days = {
[0] = "Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
}
```
* **注意：不推荐数组下标从0开始，否则很多标准库不能使用**

在构造函数的最后的“，”是可选的，可以方便以后的扩展，
构造函数中，分隔符号“，”和“；”都可以，通常用分号来分割不同元素类型的元素
number = {
a=1,b=2;"one","two","three",
}

## 第四章 基本语法
### 4.1 赋值语句

赋值是改变一个变量的值和改变表域的最基本方法
a = "hello" .. "world"
t.n = t.n + 1  

Lua可以对多个变量同时赋值，变量列表和值列表的各个元素用逗号分开，赋值语句右边的值会一次赋给左边的变量。
```lua
a,b,c = 1,2,3
print(a,b,c)
a,b,c = 1,2 --当值少于变量时
print(a,b,c)
a,b,c = 1,2,3,4 --当值多于变量时
print(a,b,c)
```
> 1     2     3
> 1     2     nil
> 1     2     3
遇到赋值语句Lua会先计算右边所有的值然后再执行赋值操作，所以我们可以这样交换变量的值。

```lua
--交换变量值
x = 1 y = 2
x,y = y,x  --交换数组的值也可以
print(x,y)
```
> 2     1
当变量个数和值的个数不一致时，Lua会一直以变量个数为基础采取以下策略：
a、变量个数>值的个数  按变量个数不足nil
b、变量个数<值的个数  多余的值会被忽略

* 容易出错的地方是：
```lua
a,b,c = 0     --错误
print(a,b,c)
a,b,c = 0,0,0  --正确
print(a,b,c)
```
> 0     nil     nil
> 0     0     0

多值赋值经常用来交换变量，或将函数调用返回给变量：
```lua
function f ()
     return 1,2  -可以同时返回多个值！！
end

a,b=f()
print(a,b)
```
> 1    2

可以用来查询表格

### 4.2 局部变量与代码块（block）

使用local创建一个局部变量
与全局变量不同，局部变量只在被声明的那个代码块内有效。
代码块：指一个控制结构内，一个函数体，或者一个chunk（变量被声明的那个文件或者文本串）
```lua
x = 10
local i = 1

while i <= x do
     local x = i*2
     print(x)
     i=i+1
end               

if i>20 then
     local x
     x=20
     print(x+2)
else
     print(x)
end

print(x)
```

应该尽可能的使用局部变量，两个好处：
1、避免命名冲突
2、访问局部变量的速度比全局变量更快

我们给block划定一个明确的界限，
do...end内的部分。
then .. else
else .. end

### 4.3 控制结构语句
控制结构的条件表达式结果可以是任何值，Lua认为false和nil为假，其他值为真
#### if语句  
> if 条件表达式 then
>     代码块
> end;

> if 条件表达式 then
>     代码块
> else
>      else-代码块
> end;

> if 条件表达式 then
>     代码块
> elseif
>      elseif-代码块
> ...
> else
>      else-代码块
> end;
#### while 语句

> while 条件表达式  do
>       代码块
>       迭代语句
> end

#### repeat - until 语句
> repeat
>      代码块
>      迭代语句
> until 条件表达式

#### for语句  两大类
##### 第一，数值for循环：

```lua
for i = 1 , 10 , 1 do
print(i)
end
```
> for 初始值,终止值,步长 do
步长默认为1

注意：
1. 三个表达式只会被计算一次，并且是在循环开始前

```lua
function f ()
print("我被调用了")
return 3,1  --注意：这里的1没有任何意义
end

for i = 1 , f() do
print(i)
end
```
> 我被调用了
> 1
> 2
> 3
2. 控制变量var是局部变量自动被声明，并且只有循环内有效。

```lua
for i = 1 , 3 do
print(i)
end
print(i)  --I的作用范围只在do..end 之间
```
> 1
> 2
> 3
> nil

* 保存i的方法
```lua
local li
for i = 1 , 3 do
print(i)
li = i
end
print(li)
```
> 1
> 2
> 3
> 3

3. 循环过程中不要改变控制变量的值，那样做的结果是不可预知的。如果要退出循环，使用break

##### 第二，范型for循环 
```lua
for i , v in ipairs(a) do
   print(v)
end
```
范型for遍历迭代子函数返回的每一个值
范型for和数值for有两点相同
1. 控制变量时局部变量
2. 不要修改控制变量的值
这里不太明白，以后再回来看！！
### 4.4 break和return语句
* break 语句用来退出当前循环（for，repeat，while）。在循环外部不可以使用
* return 用来从函数返回结果，当一个函数自然结束结尾会有一个默认的return。（这种函数类似pascal的过程）
Lua语法要求break和return只能出现在block的结束依据。
也就是说：作为chunk的最后一句，或者在end之前，或者在else前，或者until前
例如：
```lua
a = {0,1,2,3,4,5,6,7}
v = 4
local i = 1
while a[i] do
    if a[i]==v then break end
     i = i+1
end
print(i)
```
> 4
有时候为了调试或者其他目的需要在block的中间使用return或者break，可以显示的使用do..end来实现：
```lua
function foo()
   return  --错误的
   do  return end  --可以的
end
```

## 第五章 函数
函数的用途
1. 完成指定的任务，这种情况下函数作为调用语句使用；
2. 计算并返回值，这种情况下函数作为赋值语句的表达式使用
语法：
> function 函数名 (参数列表)
>       代码块；
>       return 返回参数列表
> end
调用函数时，如果函数的参数列表为空，必须使用()表明是函数调用。

```lua
print(8*9,9/8)
a = math.sin(3) + math.cos(10)
print(a,os.date())
```
> 72     1.125
> -0.69795152101659     05/20/14 14:21:18
但是：当函数只有一个参数并且这个参数是字符串或者表结构的时候，()是可选的。
function f()  end
print 'Hello World'        print('hello world')
dofile 'a.lua'                dofile('a.lua')
print [[aaaa                 print ([[aaaa
aaaaaa]]                             aaaaaa]])
f{x=10,y=20}               f({x=10,y=20})
type{}                        type({})
Lua也提供了面向对象方式调用函数的语法，比如o:foo(x)  与  o.foo(o,x)是等价的
Lua使用的函数可以是Lua编写也可以是其他语言编写的，对于Lua程序员来说用什么语言实现的函数使用起来都是一样的
Lua函数实参和形参的匹配与赋值语句类似，斗鱼的会被忽略，缺少的用nil补足

```lua
function f(a,b)
     print(a,b)
end
f(3)
f(3,4)
f(3,4,5)
```
> 3     nil
> 3     4
> 3     4
### 5.2 返回多个结果值
Lua函数可以返回多个结果值，比如string.find
其返回匹配串“开始和结束的下标”
如果不存在匹配串返回nil
```lua
s,e = string.find("hello Lua users","Lua")
print(s,e)
```
> 7     9
Lua函数中，在return后列出要返回的值的列表即可返回多个值
```lua
--找到最大值和最大值的序号
function maximum(a)
     local mi = 1  --序号
     local m = a[mi]  --值
     for i , val in ipairs(a) do
          if val > m then
               mi = i
               m = val
          end
     end
     return m,mi
end
print(maximum({8,10,23,12,7}))
```
> 23     3

Lua总是调整函数返回值的个数去适应调用环境，当作为一个语句调用时，所有返回值都被忽略。
```lua
function foo() end
function foo1() return "a" end
function foo2() return "a","b" end

x,y = foo2() print(x,y)
x,y = foo1() print(x,y)
x,y = foo() print(x,y)

x = foo2() print(x)
x,y,z = 10,foo2() print(x,y,z)
x,y,z = foo2(),10 print(x,y,z) --当函数不是参数列表的最后一个，就只返回1个值
```
> a     b
> a     nil
> nil     nil
> a
> 10     a     b
> a     10     nil

##### 第一，当作为表达式调用函数时，有以下几种情况：
1. 当调用作为表达式最后一个参数或者仅有一个参数时，根据变量个数函数尽可能多的返回多个值，不足补nil，超出的舍去
2. 其他情况下，函数调用仅返回第一个值（如果没有返回值为nil）
##### 第二，函数调用作为函数参数被调用时，和多值赋值是相同的
```lua
print(foo())
print(foo1())
print(foo2())
print(foo2(),10)
print(10,foo2())
print(foo2() .. "x")
```
>         --print()返回的是个空行
> a
> a     b
> a     10
> 10     a     b
> ax

##### 第三，函数调用在表结构函数中初始化时，和多值赋值时相同
```lua
function foo() end
function foo1() return "a" end
function foo2() return "a","b" end

function show(a)
for i,v in ipairs(a) do
     print(v)
end
end

a={foo()} show(a)
print("-----------")
a={foo1()} show(a)
print("-----------")
a={foo2()} show(a)
print("-----------")
a={foo2(),10} show(a)
```
> -----------
> a
> -----------
> a
> b
> -----------
> a
> 10

另外 return f() 这种类型的返回f()返回所有制
```lua
function foo0() end
function foo1() return "a" end
function foo2() return "a","b" end

function foo(i)
if i == 0 then return foo0()
elseif i == 1 then return foo1()
elseif i == 2 then return foo2()
end
end

print(foo(1))
print(foo(2))
print(foo(0)) --没有返回值
print(foo(4)) --没有返回值
```
> a
> a     b


可以使用圆括号强制是调用返回第一个值
```lua
function foo0() end
function foo1() return "a" end
function foo2() return "a","b" end

print((foo0()))
print((foo1()))
print((foo2()))
```
> nil
> a
> a

一个return语句如果使用圆括号将返回值括起来也将导致返回一个值
函数多值返回的特殊函数unpack，接受一个数组作为输入参数，返回数组的所有元素
unpack被用来实现泛型调用机制，在C语言中可以使用函数指针调用可变的函数，可以声明参数可变的函数，但不能两者同时可变。
在Lua中如果你想调用可变参数的可变函数只需要这样
```lua
f = string.find
a = {"hello","ll"}
print(f(unpack(a)))

print(unpack(a))
```
> 3     4
> hello     ll

```lua
-- 进化型
function foo() end
function foo1() return "a" end
function foo2() return "a","b" end

a={foo()} print(unpack(a))
a={foo1()} print(unpack(a))
a={foo2()} print(unpack(a))
a={foo2(),10} print(unpack(a))
unpack函数  自制的
function unpack(t,i)
     i = i or 1
     if t[i] then
          return t[i],unpack(t,i+1)
     end
end

a={"a","b","c","d","e","tt","d"}
print(unpack(a))
```
> a     b     c     d     e     tt     d

### 5.2 可变参数
Lua函数可以接受可变数的参数，和C语言类似在函数参数列表中使用三点（...)，表示函数游客便的参数。
Lua将函数的参数放在一个叫arg的表中，除了参数以外，arg表还有一个域n表示参数的个数。
重写print函数
```lua
printResult = ""

function print(...)
     for i,v in ipairs(arg) do
          printResult = printResult .. tostring(v) .. "\t"
     end
     printResult = printResult .. "\n"
end

print("a","b","c","d")

io.write(printResult)
```
> a     b     c     d

有时候我们可能需要几个固定参数加上可变参数

```lua
function g (a,b,...)
print('a=' .. a)
print('b=' .. (b or "nil"))
print( unpack(arg))
print("arg.n=" .. (arg.n or 0))
print("----")
end

g(3)
g(3,4)
g(3,4,5)
g(3,4,5,6)
```
> a=3
> b=nil
> 
> arg.n=0
> 
> ----
> 
> a=3
> b=4
> 
> arg.n=0
> 
> ----
> 
> a=3
> b=4
> 5
> arg.n=1
> 
> ----
> 
> a=3
> b=4
> 5     6
> arg.n=2
> 
> ----

如上面所示，Lua会将前面的实参传给函数的固定参数，后面的实参放在arg表中。
如果我们只想要string.find返回的第二个值：
使用虚变量（下划线）
local _,x = string.find("abcdefg","abc")
还可以利用可变参数声明一个select函数：
```lua
function select (n,...)
return arg[n]
end

print(string.find("hello hello","hel"))
print(select(1,string.find("hello hello","hel")))
print(select(2,string.find("hello hello","hel")))
```
> 1     3
> 1
> 3

有时候 需要将函数的可变参数传递给另外的函数调用，可以使用前面我们说过的unpack（arg）返回arg表所有的可变参数，
Lua提供了一个文本格式化的函数string.format()   类似C语言的sprintf函数)

```lua
function fwrite (fmt,...)
     return io.write(string.format(fmt,unpack(arg)))
end
```

这个例子将文本格式化操作和写操作组合为一个函数（但是我还是不知道这个函数是干啥用的！）

### 5.3 命名参数
Lua的函数参数是和位置相关的，调用时实参会按顺序依次传递给形参
有时候用名字指定参数是很有用的，比如rename函数用来给一个文件重命名，有时候我们记不清命名前后两个参数的顺序了
```lua
function remane(arg)
     return os.rename(arg.old,arg.new)
end

arg={old="a.lua",new="aa.lua",}
print(remane(arg)) --打印输出结果
```
> true

这样做的好处是：
1. 我只需要查询一次remane参数的顺序，重写remane的函数，并记下来这个函数有哪些参数就可以了
2. 然后我在往这个函数里传递参数的时候，只需要修改arg这个表就可以了，修改arg的时候不需要知道remane的参数顺序

当函数的参数有很多的时候，这种函数参数的传递方式很方便。
例如GUI库中创建窗体的函数有很多参数并且大部分参数是可选的，可以用下面这种方式：
```lua
w = {
x = 0 , y = 0 , width = 300 , height = 200;
title = "Lua" , background = "blue";
border = true
}

function Window (options)
     --check mandatory options
     if type(options.title) ~="string" then
          error("no title")
     elseif type(options.width) ~="number" then
          error("no width")
     elseif type(options.height) ~="number" then
          error("no height")
     end

     _Window(options.title,
          options.x or 0,
          options.y or 0,
          options.width,
          options.height,
          options.background or "white",
          options.border
          )
end

Window(w)
```

* 因为目前没有加载GUI库，所以上面的这段代码无法使用

## 第六章 再论函数

Lua中的函数式带有词法定界（lexical scoping）的第一类值（first-class values）
第一类值：在Lua中函数和其他值（数值、字符串）一样，函数可以被存放在变量中，也可以存放在表中，可以作为函数的参数，还可以作为函数的返回值。
词法定界：被嵌套的函数可以访问他外部函数的变量。（强大的编程能力）
Lua中关于函数稍微难以理解的是函数也可以没有名字，匿名的。
当我们提到函数名（如print），实际上是说一个指向特定函数的变量，像持有其他类型值的变量一样：

```lua
a = {p = print}  --把print函数赋给a.p
a.p("Hello World") --用a.p就可以实现print的功能
print = math.sin --把math.sin赋给print
a.p(print(1)) --print就变成了计算sin
sin = a.p --把a.p赋给sin
sin(10,20) -- sin就成了print
```
> Hello World
> 0.8414709848079
> 10     20

既然函数是值，那么表达式也可以创建创建函数了

```lua
function foo(x) return 2*x end
--语法上的甜头  syntactic sugar
foo1 = function (x) return 2*x end

print(foo(1))
print(foo1(2))
```
> 2
> 4

函数定义实际上是一个赋值语句，将类型为function的变量赋值给一个变量。
我们使用function（x） ... end来定义一个函数和使用{}创建一个表一样。
table标准库提供一个排序函数，接受一个表作为输入参数并且排序表中的元素。
这个函数必须能够对不同类型的值（字符串或者数值）按升序或者降序进行排序。
Lua不是尽可能多地提供参数来满足这些情况的需要，而是接受一个排序函数作为参数（类似C++的函数对象），排序函数接受两个排序作为输入参数，并且返回两者的大小关系。
```lua
network = {
     {name = "grauna", IP = "210.26.30.34"},
     {name = "arraial", IP = "210.26.30.23"},
     {name = "lua", IP = "210.26.30.12"},
     {name = "derain", IP = "210.26.30.20"},
     {name = "admin", IP = "210.26.30.24"},
}

table.sort(network,function (a,b) return (a.name<b.name) end)

for i ,v in ipairs(network) do
print(v.name,v.IP)
end
```
> admin     210.26.30.24
> arraial     210.26.30.23
> derain     210.26.30.20
> grauna     210.26.30.34
> lua     210.26.30.12

红色部分是一个作为参数传递的函数，绿色的箭头决定了排列的顺序
（我估计这是一个固定模式，下次拿来直接用就好了，需要改的地方就是黄色的部分
以其他函数作为参数的函数在Lua中被称为高级函数，高级函数在Lua中并没有特权，只是Lua把函数当做第一类函数处理的一个简单的结果。
绘图函数的例子：

```lua
function eraseTerminal()
     io.write("\23[2J")
end

--writes an `*' at column `x' , row `y'
function mark (x,y)
     io.write(string.format("\27[%d;%dH*",y,x))
end

--Terminal size
TermSize = {w = 80, h = 24}

--plot a function
--(assume that domain and image are in the range [-1,1])
function plot (f)
     eraseTerminal()
     for i = 1, TermSize.w do
          local x = (i / TermSize.w)*2 -1
          local y = (f(x)+1)/2*TermSize.h
          mark(i,y)
     end
     io.read() --wait before spoiling the screen
end

plot(function (x) return math.sin(x*2*math.pi) end)
```

无法呈现，书上说最后形成一条正弦曲线
将第一类值函数应用在表中是Lua实现面向对象和包机制的关键

```lua
function Human()
human =  {
name = "郭海涛" ,
age = 29 ,
sex = "男" ,
aihao = "吃饭、睡觉、打豆豆" ,
job = "编程" ,
show = function () return "姓名：" ..
  human .name .. " 年龄：" .. human.age ..
  " 性别：" .. human.sex .. "\n爱好：" ..
  human .aihao .. "\n工作：" .. human.job  end
}
return human
end
a = Human().name
b = Human()
b.name = "王庚"
print(a)
print(b.show())
```

> 姓名：王庚 年龄：29 性别：男
> 爱好：吃饭、睡觉、打豆豆
> 工作：编程
> 姓名：王庚 年龄：29 性别：男
> 爱好：吃饭、睡觉、打豆豆
> 工作：编程

可见并不是那么简单的，如果有一个复制功能就好了

### 6.1 闭包

当一个函数内部嵌套拎一个函数定义时，内部的函数体可以访问外部的函数的局部变量，这就是词法定界。
词法定界+第一类函数=一个很复杂的很强大的概念
例子：有一个学生姓名的列表和一个学生名和成绩对应的表：
现在想根据学生的成绩从高到低对学生进行排序

```lua
names = {"a","b","c"}
grades = {a=10,b=20,c=15}
function sortbygrade (names,grades)
     table.sort(names,
          function(n1,n2)
               return grades[n1]>grades[n2]
          end)
end

sortbygrade(names,grades)
print(unpack(names))
```
> b     c     a

* 分析：
names表和grades表之间的关系是grades的下标是names的值
例子中包含在sortbygrade函数内部的sort中的匿名函数可以访问sortbygrade的参数grades，在匿名函数内部grades不是全局变量也不是局部变量，被称为外部的局部变量（upvalue）

```lua
function newCounter()
     local i = 0
     return function()
          i = i+1
          return i
     end
end

c1 = newCounter()
print(c1())
print(c1())
print(c1())
```
> 1
> 2
> 3

```lua
function newCounter()
     local i = 0
     return function()
          i = i+1
          return i
     end
end

c1 = newCounter()
c2 = newCounter()
print(c1())
print(c1())
print(c2())
```
> 1
> 2
> 1

* c1和c2是两个不同的闭包

闭包：就是一个函数加上它可以正确访问的upvalues
如果我们再次调用newCounter，将创建一个新的局部变量i，因此我们得到了一个作用在新的变量i上的闭包
c1和c2都是建立在同一个函数上，但作用在同一个局部变量的不同实例上的两个不同的闭包
技术上讲，闭包指值而不是指函数，函数仅仅是包含的一个原型声明；

闭包的作用：
* 可以作为高级函数（sort）的参数，
* 作为函数嵌套的函数（newCounter）
也可以用在回调函数中，比如不同的按钮返回不同的数值

```lua
function digitButton (digit)
     return Button{ label = digit,
                    action = function ()
                         add_to_display(digit)
                    end
     }
end
```

红色部分是一个闭包
digitButton是一个创建新按钮的工具
label是按钮的标签
action是按钮被按下是调用的回调函数（实际上是一个闭包，因为他访问upvalue digit）。
digitButton完成任务返回后，局部变量digit超出范围，回调函数仍然可以被调用并且可以访问局部变量digit。
闭包在完全不同的上下文中也很有用途。
因为函数被存储在普通的变量内，我们可以很方便的重定义或者预定义函数。
通常当你需要原始函数有一个新的实现时可以冲定义函数，
例如我们可以重定义sin使其接受一个度数而不是弧度作为参数：
```lua
oldSin = math.sin
math.sin = function(x)
   return oldSin(x*math.pi/180)
end
```

或者

```lua
do
     local oldSin = math.sin
     local k = math.pi/180
     math.sin = function(x)
          return oldSin(x*k)
     end
end
```

第二种方法的好处是，把原有的版本放在一个局部变量内，访问sin的唯一方法就是通过新版本的函数，旧版本彻底不能用了
利用同样的特征我们可以创建一个安全的环境（也称作沙箱，和java里的沙箱一样）
当我们运行一段不信任的代码（比如我们运行服务器上获取的代码）时，安全的环境是需要的，比如我们可以使用闭包重定义io库的open函数来限制程序打开的文件。

```lua
function access_OK(filename,mode)
     --判断文件是否允许打开
end

do
     local oldOpen = io.open
     io.open = function(filename,mode)
          if access_OK(filename,mode) then
               return oldOpen(filename,mode)
          else
               return nil,"access denied"
          end
     end
end
```

### 6.2 非全局函数
Lua中函数可以作为全局变量也可以作为局部变量
函数作为table的域（大部分Lua标准库使用这种机制来实现，比如io.read、math.sin）。
这种感觉情况下，必须注意函数和表的语法：

1. 表和函数放在一起
```lua
Lib={}
Lib.foo = function(x,y) return x+y end
Lib.goo = function(x,y) return x-y end
```

2. 使用表构造函数
```lua
Lib={
foo = function(x,y) return x+y end
goo = function(x,y) return x-y end
}
```
3. Lua提供另一种语法方法
```lua
Lib = {}
function Lib.foo(x,y)
     return x+y
end
function Lib.goo(x,y)
     return x-y
end
```

当我们将函数保存在一个局部变量内时，我们得到一个局部函数，也就是说拒不函数像局部变量一样在一定范围内有效。
这种定义在包中是非常有用的：
因为Lua把chunk当做函数处理，在chunk内可以声明局部函数（仅仅在chunk可见），词法定界保证了包内的其他函数可以调用此函数。
声明局部函数的两种方法：

* 方法一

```lua
do
     local f = function (...)
          print("a")
     end

     local g = function(...)
          print("b")
          f()
          print("c")
     end

     g() --这里可以看到f函数

end

g() --这里看不到g函数
```

* 方法二
```lua
local function f(...)
     print("a")
end
```

注意：声明递归局部函数的方法

错误的
```lua
local fact = function (n)
     if n == 0 then
          return 1
     else
          return n*fact(n-1)  --报错的地方
     end
end
```

正确的
```lua
local fact   --需要先声明
fact = function (n)
     if n == 0 then
          return 1
     else
          return n*fact(n-1)
     end
end
```

错误的方式导致Lua编译时遇到的fact(n-1)并不知道他是局部变量fact，Lua回去查找是否有这样的全局函数fact。
好吧！在直接递归是上面的两种方法都可以，就是自己调用自己。
但是在非直接递归的时候必须先声明
如
```lua
local f, g
function g()
   ... f() ...
end
function f()
   ... g() ...
end
```

### 6.3 正确的为调用（Proper Tail Calls）
Lua中函数的另一个有趣的特征是可以正确的处理尾调用
尾调用是一种类似在函数结尾的goto调用，当函数最后一个动作是调用另外一个函数时，我们称这种调用为尾调用。

```lua
function f(x)
     return g(x)
end
```

g的调用就是尾调用
例子中 f调用g后不会再做任何事情，这种情况下当被调用函数g结束时程序不需要返回到调用者f；所以尾调用之后程序不需要在栈中保留关于调用者的任何信息。
一些编译器比如Lua解释器利用这种特征在处理尾调用时不使用额外的栈，我们称这种语言支持正确的尾调用
由于尾调用不需要使用栈空间，那么尾调用递归的层次可以无限制的
例如下面调用无论n为何值都不会导致栈溢出。
```lua
function foo (n)
     if n>0 then rturn foo(n-1) end
end
```

需要注意的是，必须明确什么是尾调用。
一些调用者函数调用其他函数后也没有做其他的事情，但是不属于尾调用例如
```lua
function f (x)
     g(x)
     return
end
```

上面这个例子中f在调用g后，不得不丢弃g的返回值，所以不是尾调用，同样的下面几个例子也不属于尾调用

```lua
return g(x) + 1
return x or g(x)
return (g(x))
```

Lua中类似return g(...)这种格式的调用时尾调用，但是g和g的参数都可以是复杂的表达式，因为Lua会在调用之前计算表达式的值，
属于尾调用
```lua
return x[i].foo(x[j]+a*b,i+j)
```

可以将尾调用理解成一种goto，在状态机的编程领域尾调用是非常有用的
状态机的应用要求函数记住每一个状态，改变状态只需要geto（or call）一个特定的函数。我们考虑一个迷宫游戏的例子：迷宫有很多房间，每一个房间都有东西南北四个门，每一步输入一个移动的方向，如果该方向存在即到达该方向对应的房间，否则程序打印警告信息。目标是从开始的房间到达目标的房间。
这个迷宫是典型的状态机，每个当前的房间是一个状态。我们可以对每个房间写一个函数实现这个迷宫游戏，我们使用尾调用从一个房间移动到另一个房间。一个四个房间的迷宫代码如下

```lua
function room1 ()
     print("这里是room1")
     local move = io.read()
     if move == "south" then
          return room3()
     elseif move == "east" then
          return room2()
     else
          print("invalid move")
          return room1() --留在原地
     end
end

function room2 ()
     print("这里是room2")
     local move = io.read()
     if move == "south" then
          return room4()
     elseif move == "west" then
          return room1()
     else
          print("invalid move")
          return room2() --留在原地
     end
end

function room3 ()
     print("这里是room3")
     local move = io.read()
     if move == "north" then
          return room1()
     elseif move == "east" then
          return room4()
     else
          print("invalid move")
          return room3() --留在原地
     end
end

function room4 ()
     print("congratilations!")
end

room1()
```

如果没有正确的尾调用，每一次移动都会创建一个栈，多次移动后可能导致栈溢出。
但是正确的尾调用，可以无限制的尾调用，只是进行了goto语句，并不是传统的函数调用

## 第七章 迭代器与泛型for
### 7.1 迭代器与闭包

迭代器是一种支持指针类型的结构，他可以遍历集合的每一个元素。
在Lua中我们常常使用函数来描述迭代器，每次调用该函数就返回集合的下一个元素。
迭代器需要保留上一次成功调用的状态和下一次成功调用的状态，也就是是他知道来自于哪里和将要前往哪里。
闭包提供的基值可以很容易实现这个任务。
记住：闭包是一个内部函数，他可以访问一个或多个外部函数的外部局部变量。
每次闭包的成功调用后，这些外部局部变量都保存他们的值（状态）。
当然，如果要创建一个闭包必须要创建其外部局部变量。
所以一个典型的闭包结构包含两个函数：
一个是闭包自己；
一个是工厂（创建闭包的函数）
例子：一个list的简单迭代器，与ipairs()不同的是，我们实线的这个迭代器返回元素的值而不是索引的下标：
```lua
function list_iter(t)  --迭代器
     local i = 0
     local n = table.getn(t)
     return function ()
          i = i + 1
          if i <=n then return t[i] end
     end
end

a = {1,2,3,4,5,6}
print(table.getn(a))  -->6
```
table.getn(a)  得到数组的长度

这个例子中list_iter是一个工厂，每次调用它都会创建一个新的闭包（迭代器本身）。
闭包保存内部局部变量（t,i,n)，因此诶地调用他返回list的下一个元素值，当list中没有值时，返回nil 我们可以再while语句中使用这个迭代器

```lua
function list_iter(t)
     local i = 0
     local n = table.getn(t)
     return function ()
          i = i + 1
          if i <=n then return t[i] end
     end
end

a = {1,2,3,4,5,6}
print(table.getn(a))

iter = list_iter(a)
while true do
     local element = iter()
     if element == nil then break end
     print (element)
end
```

我们设计的这个迭代器也可以用在泛型for语句
```lua
for element in list_iter(a) do
     print(element)
end
```
可以想象成，迭代器把数值返回到了element中，假设如果返回的是2个变量，那么只需要在因前面放两个变量
```lua
function list_iter(t)
     local i = 0
     local n = table.getn(t)
     return function ()
          i = i + 1
          if i <=n then return t[i],i end
     end
end

a = {1,2,3,4,5,6}

iter = list_iter(a)

for element,i in list_iter(a) do
     print(element .. "下标" .. i)
end
```
> 1下标1
> 2下标2
> 3下标3
> 4下标4
> 5下标5
> 6下标6

泛型for为迭代循环处理所有的簿记（bookkeeping）：
1. 首先调用迭代器工厂；内部保留迭代函数，因此不需要iter变量
2. 每次一新的迭代处理迭代器函数；当迭代器返回nil时循环结束。

高级的例子
```lua
function allwords()
     local line = io.read()
     local pos = 1
     return function ()
          while line do
               local s,e = string.find(line,"%w+",pos)
               if s then
                    pos = e+1
                    return string.sub(line,s,e)
               else
                    line = io.read()
                    pos = 1
               end
          end
     return nil
     end
end
```

这个迭代器遍历一个文件内所有匹配的单词。
为了达到目的，我们需要保存两个值，当前行和当前行的偏移量，我们使用两个外部局部变量line、pos保存这两个值
迭代函数的主体部分调用了string.find函数，string.find在当前行从当前位置开始查找匹配的单词，例子中匹配的单词使用模式'%w+'描述的，如果查找到一个单词，迭代函数更新当前位置pos为单词后的第一个位置，并且返回这个单词
```lua
function allwords()
     local line = io.read()
     local pos = 1
     return function ()
          while line do
               local s,e = string.find(line,"abc",pos)
               if s then
                    pos = e+1
                    return string.sub(line,s,e)
               else
                    line = io.read()
                    pos = 1
               end
          end
     return nil
     end
end

--迭代函数的使用
for v in allwords() do
     print(v)
end
```
把"%w+"换成了"abc"

当你输入一行字符的时候，把这行字符中的abc都找到
尽管迭代函数有些复杂，但是使用起来是很直观的
通常情况下，迭代函数都难写易用。
这不是一个大问题：一般Lua编程不需要自己定义迭代函数，而是使用语言提供的，除非确实需要自己定义。

### 7.2 泛型for的语义
     前面我们看到的迭代器有一个缺点：
每次调用都需要创建一个闭包，大多数情况下，这种做法没问题，例如在allwords迭代器中创建一个闭包的代价比起读整个文件来说微不足道，然而在有些情况下创建闭包的代价是不能容忍的，在这种情况下我们可以使用泛型for本身来保存迭代状态。
前面我们看到了循环过程中，for在自己内部保存迭代函数，实际上他保存三个值，迭代函数，状态函数和控制函数
泛型for的文法如下：
```lua
for <var-list变量列表> in <exp-list表达式列表> do
        <body>
end
```
<var-list>是一个或多个以逗号分隔的变量名列表，
<exp-list>是一个或多个以逗号分隔的表达式列表，通常情况下exp-list只有一个值：迭代工厂的调用。

```lua
a = {11,22,33,44,55,66}

for k,v in pairs(a) do    
     print(k,v)
end
```
> 1     11
> 2     22
> 3     33
> 4     44
> 5     55
> 6     66

变量列表k，v；表达式列表pairs(t)，在很多情况下变量列表也只有一个变量，比如：
```lua
for line in io.lines() do
     io.write(line,"\n")
end
```
功能，你输入一行他就输出一行然后换行
我们称变量列表中第一个变量为控制变量，其值为nil时结束循环。
泛型for的执行过程：
一、初始化，计算in后面表达式的值，表达式应该返回泛型for需要的三个值：迭代函数，状态常量和控制变量；与多值赋值一样，如果表达式返回的结果个数不足三个会自动用nil补足，多出部分被忽略。
二、将状态常量和控制变量作为参数调用迭代函数（注意：对于for结构来说，状态常量没有用处，仅仅在初始化时获取他的值并传递给迭代函数）
三、将迭代函数返回的值赋给变量列表。
四、如果返回的一个值为nil循环结束，否则执行循环体。
五、回到第二步再次调用迭代函数。

更精确来说：

`for var_1,...,var_n in explist do block end`

等价于
```lua
do
    local _f,_s,_var = explist
    while true do
        local var_1,...,var_n = _f(_s,_var)
        _var = var_1
        if _var == nil then break end
        block
    end
end
```
如果我们的迭代函数式f，状态常量是s，控制变量的初始值是a0，那么控制变量将循环：a1=f(s,a0)、a2=f(s,a1)、...,知道ai=nil
### 7.3 无状态的迭代器
无状态的迭代器是指不保留任何状态的迭代器，因此再循环中我们可以利用无状态迭代器避免创建闭包花费额外的代价。
每一次迭代，迭代函数都是用两个变量（状态常量和控制常量）的值作为参数被调用，一个无状态的迭代器只利用这两个值可以获取下一个元素。这种无状态迭代器的典型的简单的列子是ipairs，他办理数组的每一个元素。
```lua
for k,v in ipairs(a) do
     print(k,v)
end
```
迭代的状态包括被遍历的表（循环过程中不会改变的状态常量）和当前的索引下标（控制变量），ipairs和迭代函数都很简单
```lua
a = {11,22,33,44,55,66}
function iter (a,i)
     i = i+1
     local v = a[i]
     if v then return i , v end
end

function ipairs (a) --此函数只被运行一次
     return iter,a,0
end

for k,v in ipairs(a) do
     print(k,v)
end
```
当Lua调用ipairs(a)开始循环时，他获取三个值，迭代函数iter，状态常量a和控制变量初始值0；然后Lua调用iter(a,0)返回1，a[1]（除非a[1]=nil)；第二次迭代调用iter(a,1)返回2，a[2]...直到第一个非nil元素
Lua库中实现的pairs是一个用next实现的原始方法：

```lua
---pairs函数的源代码
--利用next进行迭代
function pairs (t)
  return next , t, nil
end
---pairs函数的使用
for k,v in pairs(a) do
  print(k,v)
end
---直接使用next
for k , v in next, a do
  print(k,v)
end
```
记住：exp-list返回结果会被调整为三个，所以Lua获取next、t、nil；确切的说当他调用pairs时获取。
```lua
---直接使用next
for k , v in next, a, 2 do
  print(k,v)
end
```
实验：因为Lua获取的是三个参数，所以如果我们不给他他得到的是nil，如果给他一个值，比如2，就从第三个位置开始遍历了

> 3     33
> 4     44
> 5     55
> 6     66

### 7.4 多状态的迭代器
很多情况下，迭代器需要保存多个状态信息而不是简单的状态常量和控制变量，最简单的方法是使用闭包，还有一种方法就是讲所有信息封装到table内，将table作为迭代器的状态常量，因为这种情况下可以将所有的信息存放在table内，所以迭代函数通常不需要第二个参数。
下面我们重写allwords迭代器，这一次我们不是使用闭包而是使用带两个域(line,pos)的table
开始迭代的函数很简单，他必须返回迭代函数和初始状态：
```lua
local iterator

function allwords()
     local state = {line = io.read() , pos = 1}
     return iterator , state
end

function iterator(state)
     while state.line do
          local s,e=string.find(state.line,"abc",state.pos)
          if s then
               state.pos = e+1
               return string.sub(state.line,s,e)
          else
               state.line = io.read()
               state.pos = 1
          end
     end
     return nil
end

for v in allwords() do
     print(v)
end
```
我们应该尽可能的写无状态的迭代器，因为这样循环的时候有for来保存状态，不需要创建对象花费的代价小；
如果不能用无状态的迭代器实现，应尽可能使用闭包；
尽量不要使用table这种方式，因为创建闭包的代价比创建table小。另外Lua处理闭包要比处理table速度快。

### 7.5 真正的迭代器
迭代器并没有迭代，完成迭代功能的是for语句，叫做“生成器”更合适。
有一种方式创建一个在内部完成迭代的迭代器。
这样当我们使用迭代器的时候就不需要使用循环了；我们仅仅使用第一次迭代需要处理的任务作为参数调用迭代器即可，具体地说，迭代器接受一个函数作为参数，并且这个函数在迭代器内部被调用。

```lua
---真正的迭代器

function allwords (f)
--repeat for each line in the file
     for l in io.lines() do
          --repeat for each word in the line
          for w in string.gfind(l,"abc") do
               --call the function
               f(w)
          end
     end
end

allwords(print)
```

更一般的做法是我们匿名函数作为参数，下面的例子打印出单词“Hello”出现的次数：
```lua
allwords(function (w)
if w=="hello" then count = count + 1 end
end
)

print(count)
```
用for结构完成同样的任务
```lua
local count = 0
for w in allwords() do
     if w=="hello" then count = count + 1                       end
end
print(count)
```

真正的迭代器风格的写法在Lua老版本中很流行，那时还没有for循环
两种风格的写法相差不大，但也有区别：
1. 第二种风格冯容易书写和理解；
2. for结构更灵活，可以使用break和continue语句；
在真正的迭代器风格写法中return语句只是从匿名函数中返回而不是退出循环。

## 第八章 编译、运行、调试
虽然我们把lua当做解释性语言，但是lua会首先把代码预编译成中间码然后在执行（很多语言都是这么干的）
在解释性语言中存在编译阶段听起来不合适，然后解释性语言的特征不在于他们是否被编译，而是编译器是语言运行时的一部分，所以执行编译产生的中间码速度更快。我们可以说函数dofile的存在就是说明可以将lua作为一种解释性语言被调用
前面我们介绍过dofile，把它当做lua运行代码的chunk的一种原始的操作。dofile实际上是一个辅助的函数。真正完成功能的是loadfile；与dofile不同的是loadfile编译代码成中间码并返回编译后的chunk作为一个函数。而不是执行代码；另外loadfile不会抛出错误信息而是返回错误代码。我们可以这样定义dofile：
```lua
function dofile (filename)
     local f = assert(loadfile(filename))
     return f()
end
```
如果loadfile失败assert会抛出错误
发生错误的情况下loadfile返回nil和错误信息，这样我们就可以自定义错误处理。
如果运行一个文件多次的话，loadfile只需要编译一次，但可多次运行。dofile每次都要编译
loadstring  与 loadfile相似，只不过他不是从文件里读入chunk，而是从一个串中读入。
例如：
```lua
f = loadstring("i = i+1")
i = 0
f(); print(i)
f(); print(i)
```
> 1
> 2

loadstring 函数功能强大，但是使用时需要多加小心。确认没有其它简单的解决问题的方法在使用
Lua把每一个chunk都作为一个匿名函数处理。
例如：chunk“a = 1” ，loadstring返回与其等价的function() a = 1 end
与其他函数一样，chunks可以定义局部变量也可以返回值：
```lua
f = loadstring ("local a = 10 ; return a +20")
print(f())
```
> 30
> 
loadfile 和 loadstring 都不会抛出错误，如果发生错误他们将返回nil加上错误信息；

print(loadstring ("local a =z 10 ; return a +20"))
nil     [string "local a =z 10 ; return a +20"]:1: unexpected symbol near '10'

另外，loadfile和loadstring 都不会有边界效应产生，他们仅仅编译chunk称为自己内部实现的一个匿名函数。通常对他们的误解是他们定义了函数。
Lua中的函数定义是发生在运行时的赋值而不是发生在编译时。加入我们有一个文件foo.lua：

```lua
-- file 'foo.lua'
function foo (x)
     print(x)
end
f = loadfile("foo.lua") --被编译
f()   --被执行
foo("ok")
```

当我们执行f=loadfile("foo.lua")后
foo被编译了但还没有被定义，如果要定义它必须运行chunk
如果你想快捷的调用dostring（比如加载并运行），可以这样
```lua
s = "print('11231')"
loadstring(s)()
```
> 11231

f = loadstring("i = i + 1")   -- 1
等价于
f = function() i = i+1 end    --2
但是2的速度更快，因为2只编译一次，1却每次都会编译。

```lua
local i = 0   --局部变量

f = loadstring("return i")
g = function() return i end

print(f())
print(g())
```
> nil    -- loadstring无法访问
> 0

```lua
i = 0   --全局变量

f = loadstring("return i")
g = function() return i end

print(f())
print(g())
```
> 0
> 0

可以看到：
loadstring 能够访问全局变量，访问不了局部变量
loadstring通常用于运行程序外部的代码，比如运行用户自定义的代码。
注意loadstring期望一个chunk，即语句。
如果想要加载表达式，需要在表达式前加return，那样讲返回表达式的值

```lua
print "enter your expression:"
local l = io.read()
local func = assert(loadstring ("return " .. l))
print("the value of your expression is " .. func())
```
> enter your expression:
> 1+1
> the value of your expression is 2

loadstring返回的函数和普通函数一样，可以多次被调用：

```lua
print 'enter function to be plotted (with variable "x"):'
local l = io.read()
local f = assert(loadstring("return " .. l))
for i = 1 , 20 do
     x = i
     print(string.rep("*" , f()))
end
```
> ******
> ******
> ******
> ******
> ...
> ******
> ******
> ******
> ******  一共20行

```lua
print(string.rep("*",5))
```

> *****      --输出几个重复的

### 8.1 require 函数
Lua提供高级的require函数来加载运行库。
require与dofile完全相同的功能，但是有两点不同：
1. require会搜索目录加载文件
2. require会判断是否文件已经加载避免重复加载同一文件。

所以，require是更好的加载库的函数。
require使用的路径和普通的路径有区别，
普通路径都是一个目录列表。require的路径是一个模式列表，每一个模式指明一种有虚文件名(require的参数）转成是文件名的方法。
模式匹配，把文件名放进？内
例如：
```lua
?;?.lua;c:\windows\?;/usr/local/lua/?/?.lua
```

调用require “lili”是会试着打开这些文件：
* lili
* lili.lua
* c:\windows\lili
* /usr/local/lua/lili/lili.lua

require关注的问题只有分号（模式之间的分隔符）和问号，其他的信息（目录分隔符，文件扩展名）在路径中定义。
为了确定路径，Lua首先检查全局变量LUA_PATH是否为一个字符串，如果是则认为这个串就是路径；否则rquire检查环境变量LUA_PATH的值，如果两个都失败require使用固定的路径（典型的”?;?.lua“）
require的另一个功能是避免重复加载同一个文件两次。
Lua保留一张所有已加载的文件的列表（使用table保存）。如果一个加载的文件在表中存在require简单的返回；
表中保留加载文件的虚名，而不是文件的实名。
所以如果你使用不同的虚拟文件名require同一个文件两次，将会加载两次该文件。
比如require “foo" 和 require ”foo.lua“ 路径为”?;?.lua“将会加在foo.lua两次。
我们可以通过全局变量_LOADED访问文件名列表，这样我们就可以判断文件是否加载过。
```lua
require "aa"
print(twice(23))
```
> 46

_LOADED是一个nil？？？
require的模式可以在最后放一个绝对路径，当所有的模式都匹配失败了他会使用绝对路径，但是绝对路径必须放在最后

### 8.2 C Packages
Lua和C是很容易结合的，使用C为Lua写包。与Lua中写包不同，C包在使用以前必须首先加载并连接，在大多数系统中最容易实现方式是通过动态链接库机制，然而动态链接库不是ANSI C的一部分，也就是说在标准C实现动态链接是很困难的。
在Lua提示符下运行print(loadlib())
这里以后再细看。。。。。。


### 8.3 错误
error函数
通过error函数显示的抛出错误信息

```lua
print 'enter a number:'
--使用error抛出错误
n = io.read("*number")
if not n then error("invalid input") end
--使用assert抛出错误
n = assert(io.read("*number"),"invalid input")
```

assert首先检查第一个参数是否返回错误，如果不返回错误assert简单的返回，否则assert会调用第二个参数抛出错误信息。

第二个参数是可选的。
assert是普通函数，他会先计算两个参数然后在调用函数
错误案例
```lua
n = io.read()
assert(tonumber(n),"invalid input:" .. n .. "is not a number")
```
可是我没有发现任何异常？？
正确做法
```lua
n = io.read()
text = "invalid input:" .. n .. "is not a number"
assert(tonumber(n),text)
```

当函数遇到异常有两个基本的动作：返回错误代码或者抛出错误。
这两种方式选择哪一种没有固定的规则，但一般的原则：容易避免的异常应该抛出错误否则返回错误代码。

```lua
file = assert(io.open("no-file","r"))
```
注意，io.open返回两个参数，即nil和错误信息
assert把io.open返回的两个参数作为实参窜入到自己里面反悔了io.open给出的错误信息

### 8.4 异常和错误处理
如果在Lua中需要处理错误，需要使用pcall函数封装这段代码
捕获所有的异常和错误：
```lua
function foo ()  --用函数封装代码
n = io.read()
text =n .. "不是数字"
assert(tonumber(n),text) --这段代码必须存在否则系统认为没有错
end

if pcall(foo) then  --用pcall调用这个函数
     print("没有异常时运行的代码")
else
     print("有异常时运行的代码")
end
```

1. 将这段代码封装在一个函数内
2. 使用pcall调用这个函数
当然也可以用匿名函数的方式调用pcall

```lua
if pcall(
     function ()
          n = io.read()
          text =n .. "不是数字"
          assert(tonumber(n),text)
     end
) then
     print("没有异常时运行的代码")
else
     print("有异常时运行的代码")
end
```
如果没有错误就返回值
```lua
n,x = pcall(foo)
print (n,x)  --n是对错   x是值
```
> true     4

一套完整的异常处理机制
```lua
function foo ()
     n = io.read()
     text =n .. "不是数字"
     assert(tonumber(n),text)
     return n
end

local  n,v = pcall(foo)

if n then
     print(v+2)
else
     print(v)
end
```
我们通过error抛出异常，通过pcall捕获异常

### 8.5 错误信息和会跟踪（Tracebacks)
这里没仔细看

## 第九章协同程序
暂时跳过

## 第十章 完整示例


# 第二篇 tables 与 objects
## 第十一章 数据结构

table是Lua中唯一的数据结构
### 11.1 数组
通过下标访问的就是数组，Lua中的数组不需要设定长度
在第一次等一的时候就已经把数组的长度决定了比如

```lua
a = {}
for i = 1 , 1000 do  --数组长度是1000
     a[i] = 0
end
```
可以根据需要设定数组起始下标

### io库

print和io.write的区别
*  使用时机不同
print用在粗略编程或者进行排错时使用
io.write用于需要完全控制输出时使用 ？？这句话不明白
*  输出目的地不同
io.write使用当前输出文件
print始终使用标准输出
* 输出内容不同
io.write不附加任何额外的字符到输出中去，例如制表符，换行符等     这个不太明白
* 自动调用tostring方法
print会自动调用tostring方法，会显示表tables、函数function和nil
io.write输出这些会报错！
