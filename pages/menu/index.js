import MenuPage from "../../components/templates/MenuPage";

//در گیت هاب نمایش داده می شود .env را برداریم کدهای داخل فایل  .env*.local ، .gitignore اگر در فایل 
//قرار می گیرد .env ولی برندار چون کلا مقادیر حساس که قرار هست پنهان شود در فایل 
export default function index({data}) {
  //را می دهد  undefined خطای در مرورگر console.log(process.env.Base_Url)
  //سمت کلاینت اجرا می شود process.env.Base_Url چون 
  // console.log(process.env.Base_Url)
  //را بیاوریم در سمت کلاینت به آن متغیر دسترسی داریم NEXT_PUBLIC_ ، .env  اما وقتی در ابتدای نام متغیر در فایل
  //حال در مرورگر مقدار متغیر نمایش داده می شود
  // console.log(process.env.NEXT_PUBLIC_Name)
  return (
    <>
    <MenuPage menu={data}/>
    </>
  )
}

//ssg
export async function getStaticProps(){
  // const res=await fetch(`http://localhost:4000/data`)
  //سمت سرور اجرا می شود getStaticProps تابع 
  //فقط سمت سرور اجرا می شود process.env.Base_Url از طرفی 
  //پیام زیر در ترمینال نمایش می دهد
  console.log(process.env.Base_Url)
  const res=await fetch(`${process.env.Base_Url}/data`)

  const data=await res.json()
  
  // console.log(data)
  return { props: {data},
    //چون می خواهیم برای برخی محصولات تخفیف بزاریم
    //یک رشته هست با + آنرا تبدیل به عدد می کنیم process.env.Revalidate چون 
    revalidate : +process.env.Revalidate ,
    }
}

