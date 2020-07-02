/*
机场订阅转化器，用于提取节点
一般机场支持UA识别返回相应格式的订阅文件，但很多是傻瓜式配置，包含了很多规则，此脚本用于提取纯节点，避免使用别人搭建的api
可用boxjs修改截取的前缀和后缀，或修改脚本prefix、suffix的值

⚠️使用转换器需手动开启，并且添加自己机场的houstname到MITM
*/

// 是否开启输出
const isEnable = !lk.getVal('lkIsEnableSubConverter') ? false : JSON.parse(lk.getVal('lkIsEnableSubConverter'))
const prefix = !lk.getVal('lkPrefixSubConverter') ? `[Proxy]` : lk.getVal('lkPrefixSubConverter')
const suffix = !lk.getVal('lkSuffixSubConverter') ? `[Proxy Group]` : lk.getVal('lkSuffixSubConverter')
const url = $request.url
let body = $response.body

if (isEnable) {
    console.log(`\n██开始转换订阅： ${url}\n██内容：${JSON.stringify(body)}`)
    const pattern = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/;// 匹配/**/注释块
    const converted = body.substring(body.indexOf(prefix)+prefix.length, body.indexOf(suffix)).replace(pattern, ``)
    console.log(`\n██转换成功\n██内容：${converted}██`)
    $done({body: converted})
} else {
    $done({body: body})
}
