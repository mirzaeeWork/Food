import { useRouter } from "next/router"
import DetailsPage from "../../components/templates/DetailsPage"

export default function DetailsOneMenu({data}) {
    const rout=useRouter()
    if(rout.isFallback){
        return <h2>Loading Page ...</h2>
    }
  return (
    <DetailsPage {...data}/> 
  )
}

//ssg
export async function getStaticPaths(){
    const res=await fetch(`${process.env.Base_Url}/data`)
    const reponse=await res.json()
    const data=reponse.slice(0,10)
    const paths= data.map(food=>({params:{id:food.id.toString()},}))
    return {
        paths ,
        //در ابتدا مشخص کردیم 10 صفحه اول را بسازد
        //برای اینکه صفحات دیگر را بسازد از خط زیر استفاده می کنیم
        fallback : true,
    }
}

export async function getStaticProps(context){
    const {params:{id},}=context
    const res=await fetch(`${process.env.Base_Url}/data/${id}`)
    const data = await res.json();
  
    if(!data.id){
        return {
            notFound : true
        }
    }
    return { props: {data},

      revalidate : +process.env.Revalidate  ,
      }
  }
  