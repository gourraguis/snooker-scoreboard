import { FunctionComponent } from 'react'

interface HeadingProps {
  title: string
}

const Heading: FunctionComponent<HeadingProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center border-primary-w my-8">
      <h3 className="text-3xl font-bold text-primary-w">{title}</h3>
    </div>
  )
}

export default Heading
