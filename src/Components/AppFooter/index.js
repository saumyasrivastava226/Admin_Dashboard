import React from 'react'
import{Typography} from "antd"

export const AppFooter = () => {
  return (
    <div className='AppFooter'> 
       <Typography.Link href="tel:+123456789">
          +917262772122
       </Typography.Link>
       <Typography.Link href="#">Privacy Policy</Typography.Link>
       <Typography.Link>Terms of Use</Typography.Link>
    </div>
  )
}
