import { handleHashCategoryById } from "../../helpers"
import catelgoryService from "../../services/catelogy"


export const ACT_FETCH_ALL_CATEGORY = 'ACT_FETCH_ALL_CATEGORY'

export function actFetchAllCategory(hashCategoryById){
    return {
        type: ACT_FETCH_ALL_CATEGORY,
        payload: {
            hashCategoryById
        }
    }
}

export function actFetchAllCategoryAsync(){
    return async dispatch => {
        try{
            const response = await catelgoryService.getList()
            const categorys= response.data
            const hashCategoryById = handleHashCategoryById(categorys)
            dispatch(actFetchAllCategory(hashCategoryById))      
        }catch(error){

        }
    }
}
