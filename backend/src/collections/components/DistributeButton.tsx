'use server'

import { UIFieldServerComponent, UIFieldServerProps } from 'payload'
import { DistributeButtonClient } from './DistributeButtonClient'

const DistributeButton: UIFieldServerComponent = async (props: UIFieldServerProps) => {
  const {
    siblingData,
    req: { payload },
  } = props

  return <DistributeButtonClient doc={siblingData} />
}

export default DistributeButton
