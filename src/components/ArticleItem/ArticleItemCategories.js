 import { Link } from 'react-router-dom';

import { useSelector } from "react-redux"

export default function ArticleItemCategories({
  categoriesID
}) {
  const hashCategoryId = useSelector(state => state.Category.hashCategoryById)

  return (
    <ul className="article-item__categories">
     
      {
        categoriesID.map(cateId => {
          const category = hashCategoryId[cateId]

          if(!category){
            return null
          }

          const categorySlugLink = '/category/' + category.slug
          return <li key={category.id}><Link to={categorySlugLink} className="btn btn-category">{category.name}</Link></li>
        })
      }
    </ul>



  )
}