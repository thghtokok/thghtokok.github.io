#!/user/bin/python
# -*- coding: UTF-8 -*-

seasons = ["ght", "wg", "jbf", "wlb"]
print(list(enumerate(seasons)))
print(list(enumerate(seasons, start=2)))

i = 0
for element in seasons:
    print(i, seasons[i], "element:", element)
    i += 1

for i, element in enumerate(seasons):
    print(i, element)

# s = "Runoob"
# print(repr(s))

# dict1 = {"runoob": "runoob.com", "google": "google.com"}
# print(repr(dict1))


# class User:
#     def __init__(self, name, age):
#         super().__init__()
#         self.name = name
#         self.age = age

#     def __str__(self):
#         return "%s:%d" % (self.name, self.age)


# user = User("郭海涛", 36)
# print(user.__str__)
# print(repr(user))


# print(sorted([1, 2, 3, 4, 5]))
# print(sorted([1, 2, 3, 4, 5], reverse=True))


# class User:
#     def __init__(self, name, age):
#         super().__init__()
#         self.name = name
#         self.age = age


# userlist = [
#     User("郭海涛", 36),
#     User("王庚", 37),
#     User("焦兵峰", 35),
#     User("亚历山大", 34),
#     User("宣德皇帝", 27),
# ]

# print(userlist)

# print(sorted(userlist, key=lambda x: x.age)[0].name)


# a = "runoob"
# print(id(a))

# b = 1
# c = 1
# print(id(b))
# print(id(c))

# print(id())


# # 设置截取5个元素的切片
# myslice = slice(5)
# print(myslice)

# arr = range(10)
# print(arr)
# print(arr[myslice])


# class TestIter(object):
#     def __init__(self):
#         super().__init__()
#         self.l = [1, 2, 3, 4, 5]
#         self.i = iter(self.l)
#     # 定义了__call__方法的类的实现是可调用的

#     def __call__(self):
#         item = next(self.i)
#         print("__call__ is called, which would return ", item)
#         return item
#     # 支持迭代协议(即定义有__iter__()函数)

#     def __iter__(self):
#         print("__iter__ is called!!")
#         return iter(self.l)


# # t是可调用的
# t = TestIter()
# # t必须是callable的, 否则无法返回 callable_iterator
# t1 = iter(t, 7)
# print(callable(t))
# for i in t1:
#     print(i)


# # 首先获得Iterator对象:
# it = iter([1, 2, 3, 4, 5])
# # 循环
# while True:
#     try:
#         # 获取下一个值
#         x = next(it)
#         print(x)
#     except StopIteration:
#         # 遇到StopIteration就退出循环
#         break

# print(hex(255))
# print(hex(-42))
# print(type(hex(-42)))


# class A(object):
#     bar = 1


# a = A()

# print(dir())
# print(dir("sys"))
# print(dir(a))


# # 列表list, 元素都不为空或0
# print(all(["a", "b", "c"]))
# # 列表list,存在一个空元素
# print(all(["a", "b", "c", ""]))
# # 列表list, 存在一个为0的元素
# print(all([1, 2, 3, 0]))
# # 元组tuple, 元素不存在为空或0
# print(all(("a", "b", "c")))
# # 列表list,存在一个空元素
# print(all(("a", "b", "c", "")))
# # 列表list, 存在一个为0的元素
# print(all((1, 2, 3, 0)))

# # 空列表
# print(all([]))
# # 空元组
# print(all(()))

# class A(object):
#     bar = 1


# a = A()

# # 获取属性 bar 值
# print(getattr(a, "bar"))
# print(getattr(a, "bar2", 100))

# # 设置属性 bar 值
# setattr(a, "bar", 5)
# setattr(a, "name", "wg")
# print(a.bar, a.name)

# help("sys")

# # 构建空字典
# a = dict()
# print(a)
# # 传入关键字
# a = dict(a='a', b='b', t='t')
# print(a)
# # 映射函数方式来构造字典
# a = dict(zip(['one', 'two', 'three'], [1, 2, 3]))
# print(a)
# # 可迭代对象方式来构造字典
# a = dict([('one', 1), ("two", 2), ("three", 3)])
# print(a)


# # 输入三角形的三边长
# a, b, c = (input("请输入三角形三边的长: ").split())
# a = int(a)
# b = int(b)
# c = int(c)

# # 计算三角形的半周长 p
# p = (a+b+c)/2

# # 计算三角形的面积 s
# s = (p*(p-a)*(p-b)*(p-c))**0.5

# # 输出三角形的面积
# print("三角形的面积为: ", format(s, ".2f"))


# a = input("input:")
# print(type(a))
# a = input("input:")
# print(type(a))
# a = input("input:")
# print(type(a))

# print("divmod 7,2", divmod(7, 2))
# print("divmod 8,2", divmod(8, 2))
# print("divmod 1+2j,1+0.5j", divmod(1+2j, 1+0.5j))

# print("abs(-45) : ", abs(-45))
# print("abs(100.12) : ", abs(100.12))

# class MyError(RuntimeError):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)


# try:
#     file = open("D:/python_file.txt", "r", encoding="UTF-8")
#     try:
#         str = file.readline()
#         print("1. 读了: ", str)
#         raise MyError("hahaha")
#     finally:
#         print("4. finally")
#         if(file):
#             file.close()
#             print("5. 关闭了文件")
# except MyError as Argument:
#     print("2. MyError 出了一个错!", Argument)
# except IOError as Argument:
#     print("2. IOError 出了一个错!", Argument)
# except ValueError as Argument:
#     print("2.ValueError 出了一个错!", Argument)
# else:
#     print("3. 没有发生错误")

# str = input("请输入:")
# print("你输入的内容是:", str)

# file = open("D:/python_file.txt", "w", encoding="UTF-8")

# if(file.closed):
#     print("已被关闭!")
# else:
#     print("没有关闭!")

# print(file.mode, file.name)
# # print(file.softspace)

# file.write("郭海涛真帅!\n")
# weizhi = file.tell()
# print("当前文件位置: ", weizhi)

# file.write("guo hai tao zhen shuai!")

# file.close()

# if(file.closed):
#     print("已被关闭!")
# else:
#     print("没有关闭!")

# print(file.mode, file.name)

# file = open("D:/python_file.txt", "r", encoding="UTF-8")
# str = file.read(10)
# print("读取到的字符串是: ", str)
# file.close()

# from math import pi
# from math import sqrt

# print(pi)
# print(sqrt(3))

# print(dir())
# print(__name__, __file__, __doc__)

# total = 0  # 全局变量

# def sum(arg1, arg2):
#     # global total
#     total = arg1 + arg2  # total在这里是局部变量
#     print("函数内是局部变量: ", total)
#     return total

# sum(10, 20)
# print("函数外是全局变量: ", total)

# def sum(): return lambda a, b: a + b

# print(sum()(1, 2))

# def printinfo(arg1, *vartuple):
#     print("输出: ")
#     print(arg1)
#     for var in vartuple:
#         print(var)
#     return

# printinfo(10)
# printinfo(10, 20, 30)
# printinfo(10, 20, 30, "aaa")

# # 必备参数 函数
# def printme(str, name, age=20):
#     "打印任何传入的字符串"
#     print("str: %s, name: %s, age: %d" % (str, name, age))
#     return

# # 调用必备参数的函数, 必须传入参数
# printme("aaa",  name="bbb")

# a = 7
# b = [1, 2, 3]

# def test(a, b):
#     a = 1
#     b[1] = 10
#     print("函数内:", a, b)

# print("函数外:", a, b)
# test(a, b)
# print("函数外:", a, b)

# import calendar

# cal = calendar.month(2012, 1)
# print("2012年1月:")
# print(cal)

# import cmath
# import math
# import time

# # 格式化为  2016-01-29 11:11:11形式
# print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
# # 格式化为  Sat Mar 28 22:22:22 2015形式
# print(time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()))
# # 将字符串转为时间戳
# a = "Sat Mar 28 22:24:24 2016"
# print(time.mktime(time.strptime(a, "%a %b %d %H:%M:%S %Y")))

# timestr = "%y    %Y    %m    %d    %H    %I    %M    %S    %a    %A    %b    %B    %c    %j    %p    %U    %w    %W    %x    %X    %Z    %% "
# print(time.strftime(timestr, time.localtime()))

# localtime = time.localtime(time.time())
# print("本地时间: ", localtime)

# print("本地时间: ", time.asctime(time.localtime(time.time())))

# 字符串
# var1 = "Hello World!"
# print(var1[1:5])

# math 和 cmath 模块

# print(dir(math))
# print(dir(cmath))

# -- for 遍历任何序列 或 字符串

# for x in "python":
#     print("当前字母 :", x)

# for x in ["aaa", "bbb", "ccc"]:
#     print("列表, 当前项: ", x)

# for x in {"a": "aaa", "b": "bbb", "c": "ccc"}:
#     print("字典, 当前项: ", x)  # ??

# for x in ("aaa", "bbb", "ccc"):
#     print("元组, 当前项: ", x)

# fruits = ["aaa", "bbb", "ccc"]
# for index in range(len(fruits)):
#     print("当前水果 : ", fruits[index])

# for xx in range(10):
#     print("xx", xx)

# # --for else 语法

# for num in range(1, 100):
#     for i in range(2, num):
#         if num % i == 0:
#             j = num / i
#             print("%d 等于 %d * %d" % (num, i, j))
#             break
#     else:
#         print(num, "是一个质数")

# # --- 身份运算符

# a = 20
# b = 20

# if (a is b):
#     print("1 - a 和 b 有相同的标识")
# else:
#     print("1 - a 和 b 没有相同的标识")

# if (a is not b):
#     print("2 - a 和 b 没有相同的标识")
# else:
#     print("2 - a 和 b 有相同的标识")

# # 修改变量 b 的值

# b = 30

# if (a is b):
#     print("3 - a 和 b 有相同的标识")
# else:
#     print("3 - a 和 b 没有相同的标识")

# if (a is not b):
#     print("4 - a 和 b 没有相同的标识")
# else:
#     print("4 - a 和 b 有相同的标识")

# # --- 成员运算符

# a = 10
# b = 20
# list = [1, 2, 3, 4, 5]

# if (a in list):
#     print("1 - 变量a在给定的列表中 list 中")
# else:
#     print("1 - 变量a不在给定的列表中 list 中")

# if (b not in list):
#     print("2 - 变量b不在给定的列表中 list 中")
# else:
#     print("2 - 变量b在给定的列表中 list 中")

# # 改变变量a的值
# a = 2
# if (a in list):
#     print("3 - 变量a在给定的列表中 list 中")
# else:
#     print("3 - 变量a不在给定的列表中 list 中")

# # --- 布尔运算符

# a = 10
# b = 20

# if a and b:
#     print("1 - 变量 a 和 b 都为 true")
# else:
#     print("1 - 变量 a 和 b 有一个不为 true")

# if a or b:
#     print("2 - 变量 a 和 b 都为 true, 或其中一个变量为 ture")
# else:
#     print("2 - 变量 a 和 b 都不为 true")

# # 修改变量 a 的值
# a = 0
# if a and b:
#     print("3 - 变量 a 和 b 都为 true")
# else:
#     print("3 - 变量 a 和 b 有一个不为 true")

# if a or b:
#     print("4 - 变量 a 和 b 都为 true, 或其中一个变量为 ture")
# else:
#     print("4 - 变量 a 和 b 都不为 true")

# if not (a and b):
#     print("5 - 变量 a 和 b 都为 false, 或其中一个变量为 false")
# else:
#     print("5 - 变量 a 和 b 都为 true")

# # ----- 之前

# print("Hello world")
# print("你好 世界!")

# print(int("101010101", base=2))
# print(repr([1, 2, 3, 4]))
# print(str([1, 2, 3, 4]))
# print(oct(33))
# print(hex(33))

# print("abc "*3)

# a = 21
# b = 10
# c = 0

# c = a + b
# print(a, "+", b, "=", c)

# c = a - b
# print(a, "-", b, "=", c)

# c = a * b
# print(a, "*", b, "=", c)

# c = a / b
# print(a, "/", b, "=", c)

# c = a % b
# print(a, "%", b, "=", c)

# a = 2
# b = 3
# c = a ** b
# print(a, "**", b, "=", c)

# a = 10
# b = 5
# c = a // b
# print(a, "//", b, "=", c)
