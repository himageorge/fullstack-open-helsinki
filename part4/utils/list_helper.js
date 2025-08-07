const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        console.log(sum + blog.likes)
        return sum + blog.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((mostLiked, current) => {
        return mostLiked.likes > current.likes? mostLiked: current
    })
}

module.exports = { 
    dummy,
    totalLikes,
    favouriteBlog
}