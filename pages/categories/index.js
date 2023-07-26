import React from 'react'
import CategoriesPage from '../../components/templates/CategoriesPage'

export default function Categories({data}) {
  return (
    <CategoriesPage data={data}/>
  )

}

export async function getServerSideProps(context) {
  //لینک ایجاد می شود searchHandler توسط تابع  http://localhost:3000/categories در صفحه 
  //http://localhost:3000/categories?difficulty=Medium&time=more   برای مثال 
  const { query: { difficulty, time }, } = context
  const res = await fetch(`${process.env.Base_Url}/data`)
  const data = await res.json()
  const filteredData = data.filter((item) => {
    //وجود داشته باشد Difficulty نشاندهنده اینست که حتما ویژگی  detail.Difficulty
    const difficultyResult =  item.details.filter(detail => detail.Difficulty && detail.Difficulty == difficulty)
    const timeResult = item.details.filter(detail => {
      const cookingTime = detail["Cooking Time"] || "";
      //به صورت یک آرایه درمی آید cookingTime فاصله را برمیدارد و split(" ")، cookingTime خط زیر برای
      //قرار می دهد timeDetail و خانه اول را در 
      //به صورت زیر هم می توان نوشت
      //const [timeDetail] = cookingTime.split(" ");
      const timeDetail = cookingTime.split(" ")[0]
      // parseInt(timeDetail)= +timeDetail تبدیل رشته به عدد به دو صورت روبرو امکانپذیر است
      //http://localhost:3000/categories به دو روش نوشته شده است Cooking Time در لینک ربرو 
      if (time == "less" && timeDetail && +timeDetail <= 30) { return detail }
      else if (time == "more" && timeDetail && +timeDetail > 30) { return detail }
    })
    if (time && difficulty && timeResult.length && difficultyResult.length) {
      return item;
    } else if (!time && difficulty && difficultyResult.length) {
      return item;
    } else if (time && !difficulty && timeResult.length) {
      return item;
    }
  })
  return {
    props: { data: filteredData },
  };

}
