import Card from '../modules/Card'
import style from './MenuPage.module.css'

export default function MenuPage({ menu }) {
  return (
    <div className={style.container}>
      <h2>Menu</h2>
      <div className={style.subContainer}>
        {menu.map(food => <Card key={food.id} {...food}/>)}
      </div>
    </div>
  )
}



