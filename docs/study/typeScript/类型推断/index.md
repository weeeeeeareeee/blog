---
title: "函数参数类型与返回值类型"
---

# 获取函数的参数类型与返回值类型

`Parameters`与`ReturnType`可以获取函数的参数类型与返回值类型。

```ts
interface Props {
    title: String
}

interface Props2 {
    name: string
}

const getProps = (props: Props, props2: Props2): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(props.title + props2.name)
    })
}

const prop: Parameters<typeof getProps>[0] = {
    title: 'hello'
}

const prop2: Parameters<typeof getProps>[1] = {
    name: 'hello'
}

type _Props1 = Parameters<typeof getProps>[0];
type _Props2 = Parameters<typeof getProps>[1];
type _result = ReturnType<typeof getProps>;
```