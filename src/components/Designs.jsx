import React from 'react'
import { setPageContent } from '../store/pagesSlice'
import { useDispatch } from 'react-redux'
import { samplePages } from '../data/samplePages'

const Designs = () => {
  const dispatch = useDispatch()
  
  const handleDesignClick = (htmlContent) => {
    dispatch(setPageContent(htmlContent))
  }

  return (
    <>
      {samplePages.map((page, index) => (
        <img key={index} src={page.magazine} onClick={() => handleDesignClick(page.html)} alt="Sample" />
      ))}
    </>
  )
}

export default Designs