import LoadAble from 'react-loadable'
import React from 'react'
// 过渡组件
function LoadingComponent () {
  return(
    <div></div>
  )
}

export default (LoaderComponent) => {
  return LoadAble ({
    loader: LoaderComponent, // 懒加载组件
    loading: LoadingComponent // 过渡组件
  })
}
