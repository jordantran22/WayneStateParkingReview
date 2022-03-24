import React from 'react';
import ReactStars from 'react-stars';
import default_prof_pic from '../images/default_prof_pic.jpg';

const QuickViewCard = ({review}) => {
    return (
        <div className="review-card">
            <div className='review-card__reviewer-info'>
                <img src={default_prof_pic} alt='profile picture' className='profile-picture'/>
                <h3>{review.first_name} {review.last_name}</h3>
                <div className='rating'>
                    <ReactStars color2={"var(--clr-WSU-dark-gold)"} color1={"#E5E5E5"} count={5} size={30} edit={false} value={review.review_rating} />
                    <span className='rating__count'>{review.review_date}</span>
                </div>
            </div>
            <div className="review-card__review">
                {review.review_text}
            </div>
        </div>
    )
}

export default QuickViewCard