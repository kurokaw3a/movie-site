import { useNavigate } from 'react-router-dom'

const Results = ({ list }) => {
  const navigate = useNavigate()
  const t = /[?]/

  const navToCurrentMovie = (title, type, id) => {
    const mtitle = String(title)
    navigate(`/${t.test(mtitle) ? mtitle.replace("?", "") : mtitle}/${type}/${id}`)

  }
  return (
    <div>
      <div className='flex md:justify-center'>
        <div className='flex flex-wrap w-[100%] justify-center md:justify-normal md:w-[1300px] gap-[20px] mb-[60px] md:mb-0'>
          {list?.map((el) => (
            <div
              onClickCapture={() => navToCurrentMovie(el.title, el.type, el.id)}
            >
              <img
                className='w-[165px] md:w-[200px] cursor-pointer'
                src={el.poster}
                alt='none'
              />
              <h4 className='text-white font-["Inter"] text-[12px] md:text-[15px] font-medium max-w-[150px] md:w-[200px]'>
                {el.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Results
