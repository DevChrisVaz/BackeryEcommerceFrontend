import Comment from '@/domain/entities/Comment';
import Image from 'next/image';
import React from 'react';
export interface CommentProps {
	comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
	return (
		<div className="testimonial__item">
			<div className="testimonial__author">
				<div className="testimonial__author__pic">
					<Image src="/img/testimonial/user-image-not-found.png" alt="" width={70} height={70} />
				</div>
				<div className="testimonial__author__text">
					<h5>{comment.firstName + " " + comment.lastName}</h5>
					<span>{comment.city}</span>
				</div>
			</div>
			<div className="rating">
				{
					comment.score === 1 ?
						<>
							<span className="icon_star"></span>
							<span className="icon_star_alt"></span>
							<span className="icon_star_alt"></span>
							<span className="icon_star_alt"></span>
							<span className="icon_star_alt"></span>
						</> :
						comment.score === 2 ?
							<>
								<span className="icon_star"></span>
								<span className="icon_star"></span>
								<span className="icon_star_alt"></span>
								<span className="icon_star_alt"></span>
								<span className="icon_star_alt"></span>
							</> :
							comment.score === 3 ?
								<>
									<span className="icon_star"></span>
									<span className="icon_star"></span>
									<span className="icon_star"></span>
									<span className="icon_star_alt"></span>
									<span className="icon_star_alt"></span>
								</> :
								comment.score === 4 ?
									<>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
										<span className="icon_star_alt"></span>
									</> :
									comment.score === 5 &&
									<>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
										<span className="icon_star"></span>
									</>
				}
			</div>
			{/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua viverra lacus vel facilisis.</p> */}
			<p className="comment">{ comment.description }</p>
		</div>
	);
};

export default Comment;
