/**
* 将二进制的数据导出为 excel
* @param {string} data 数据
* @param contentType
* @param {string} fileName 文件名称
*/
export function exportResponseData(data, contentType, fileName) {
    const downloadLink = window.document.createElement('a')
    downloadLink.href = window.URL.createObjectURL(new Blob([data], { type: contentType }))
    downloadLink.download = fileName
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}
