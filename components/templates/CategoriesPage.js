import { useState,useEffect } from "react";
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card"

export default function CategoriesPage({ data }) {
  // console.log(data)
  const rout = useRouter()
  const [query, setQuery] = useState({ difficulty: "", time: "" })

  useEffect(() => {
    // console.log(rout.query)
    //به حالت قبل بماند چون لینک تغییر نمی کند select کردیم  reload برای اینکه وقتی صفحه را 
    const { difficulty, time } = rout.query;
    if (query.difficulty !== difficulty || query.time !== time) {
      setQuery({ difficulty, time });
    }
  }, []);


  const changeHandler = (e) => {
    //...query هرچی در متغیر بود رو نگه دار و در ادامه تغییرات لازم را اعمال کن
    setQuery({ ...query, [e.target.name]: e.target.value })
  };


  const searchHandler = () => {
    console.log(query)
    //اگر روی دکمه کلیک کنیم لینک زیر آورده می شود
    //http://localhost:3000/categories?name=Samaneh&lastname=Mirzaee
    //پیش فرض هستند pathname و query 
    // rout.push({pathname:"/categories",query:{name:"Samaneh",lastname:"Mirzaee"}})
    //بدین صورت هم می توان نوشت    rout.push({pathname:"/categories",query : query})
    rout.push({ pathname: "/categories", query })
    //برای مثال لینک زیر ایجاد می شود
    //http://localhost:3000/categories?difficulty=Medium&time=more
    //اطلاعات گرفته شده و به این صفحه برگردانده می شود pages/categories/index.js و در صفحه 
  }
  return (
    <div className={styles.container}>
      <h2>CategoriesPage</h2>
      <div className={styles.select}>
        <select value={query.difficulty} name="difficulty" onChange={changeHandler}>
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={query.time} name="time" onChange={changeHandler}>
          <option value="">Cooking Time</option>
          <option value="more">More than 30 min</option>
          <option value="less">Less than 30 min</option>
        </select>
        <button onClick={searchHandler}>Search</button>
      </div>
      <div className={styles.cards}>
        {!data.length ? <img src="/images/search.png" alt="" /> : data.map(food => <Card key={food.id} {...food} />)}
      </div>
    </div>
  )
}
