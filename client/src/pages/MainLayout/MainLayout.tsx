interface Props {
  children?: React.ReactNode
}

function MainLayout({ children }: Props) {
  return <div className='w-full flex justify-center'>{children}</div>
}

export default MainLayout
