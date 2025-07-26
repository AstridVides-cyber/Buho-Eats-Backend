// Response para estadísticas de un producto
export default class StadisticResponse {
    constructor(views, reviews, favorites, qualification) {
        this.views = views;
        this.reviews = reviews;
        this.favorites = favorites;
        this.qualification = qualification;
    }
};