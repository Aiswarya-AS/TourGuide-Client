import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import axios from '../../../utilis/axios'
import { guideProfileGet } from '../../../utilis/constants'
const GProfile = () => {
  const guide_id=Cookies.get('guide_id')
  const [guide,setGuide]=useState([])
  const [wallet,setWallet] = useState('')
  useEffect(()=>{
    axios.get(`${guideProfileGet}/${guide_id}`).then((res)=>{
      setGuide(res.data.serdata)
      setWallet(res.data.balance)
    })
  },[guide_id])
  return (
    <div>
       <div class="profile-sidebar">
                <div class="desktop-sticky-top">
                    <h4>{guide.firstname}{guide.lastname}</h4>
                    <div class="font-weight-600 mb-3 text-muted mt-n2">{guide.email}</div>
                    <p>
                        
                    </p>
                    <div class="mb-1"><i class="fa fa-map-marker-alt fa-fw text-muted"></i> {guide.place}</div>
                    {/* <div class="mb-3"><i class="fa fa-link fa-fw text-muted"></i> seantheme.com/studio</div> */}
                    <hr class="mt-4 mb-4" />
                    <div>
                      <p>Wallet Balance:{wallet}</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default GProfile
