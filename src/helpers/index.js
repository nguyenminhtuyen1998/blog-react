
export function getQueryStr(name) {
    return new URLSearchParams(window.location.search).get(name)
}

export function mappingPostData(post) {
    return {
        id: post.id,
        title: post.title.rendered,
        author: post.author_data,
        thumbnail: post.featured_media_url,
        createdDate: post.date,
        slug: post.slug,
        authorId: post.author,
        categoriesID: post.categories,
        viewCount: post.view_count
    }
}

// export function mappingCurrentUser(user){
//     return {
//         id: user.id,
//         nickname: user.nickname,
//         avtart: user.avtart_urls[96]
//     }
// }

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export function mappingUser(user){
    return {
        id : user.id,
        nickname: user.nickname,
        avatar: user.avatar_urls[96]
    }
}

export function handleHashCategoryById(categorys) {
    const hasbObj = {}

    categorys.forEach( categoryItem => {
        const key = categoryItem.id

        hasbObj[key] = {
            id: categoryItem.id,
            name: categoryItem.name,
            slug: categoryItem.slug
        }
    })

    return hasbObj
}