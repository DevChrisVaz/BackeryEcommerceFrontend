import CreateCommentUseCase from '@/application/usecases/comment/CreateCommentUseCase';
import Comment from '@/domain/entities/Comment';
import CommentErrors from '@/domain/entities/errors/CommentErrors';
import CreateCommentException from '@/domain/exceptions/comment-exceptions/CreateCommentException';
import CommentRepo from '@/infrastructure/implementations/httpRequest/axios/CommentRepo';
import CommentValidationsRepo from '@/infrastructure/implementations/validations/CommentValidationsRepo';
import { Formik } from 'formik';
import React, { useState } from 'react';
export interface CommentModalProps { }

const CommentModal: React.FC<CommentModalProps> = () => {
	const [initialValues, setInitialValues] = useState<Comment>({
		firstName: "",
		lastName: "",
		city: "",
		description: "",
		score: 0
	});
	const [errors, setErrors] = useState<CommentErrors>({});

	const commentRepo = new CommentRepo();
	const commentValidationRepo = new CommentValidationsRepo();
	const createCommentUseCase = new CreateCommentUseCase(commentRepo, commentValidationRepo);

	const handleSendComment = async (values: Comment) => {
		console.log(values);
		try {
			const { status } = await createCommentUseCase.run(values);
			if (status === 200) {
				alert("Gracias por tu comentario");
			}
		} catch (err: any) {
			console.log(err);
			if (err instanceof CreateCommentException && err.cause) setErrors(err.cause);
		}
	}

	return (
		<>
			<div className="modal fade" id="commentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="exampleModalToggleLabel">¿Te gusta Deleitelzt?</h4>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>¿Te tomarías unos segundos para contestar una pequeña encuesta?</p>
						</div>
						<div className="modal-footer">
							<button className="btn button-primary" id="open-second-modal">Sí, continuar</button>
							<button className="btn btn-secondary" data-dismiss="modal">Ahora no</button>
						</div>
					</div>
				</div>
			</div>
			<Formik
				initialValues={initialValues}
				enableReinitialize={true}
				onSubmit={handleSendComment}
			>
				{({
					values,
					setFieldValue,
					handleChange,
					handleSubmit
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="modal fade" id="secondCommentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalToggleLabel2">¿Cuál es tu nombre?</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="form-group">
											<input
												className="form-control"
												placeholder="Nombre*"
												type="firstName"
												id="firstName"
												onChange={handleChange}
												value={values.firstName}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												placeholder="Apellido"
												className="form-control"
												id="lastName"
												name="lastName"
												onChange={handleChange}
												value={values.lastName}
											/>
										</div>
									</div>
									<div className="modal-footer">
										<button
											type="button"
											id="open-third-modal"
											className="btn button-primary"
											disabled={values.firstName && values.lastName ? false : true}
										// data-dismiss="modal"
										>Siguiente</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal fade" id="thirdCommentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabIndex={-1}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalToggleLabel3">¿De qué ciudad nos visitas?</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="form-group">
											<input
												className="form-control"
												placeholder="Ciudad*"
												type="text"
												name="city"
												id="city"
												onChange={handleChange}
												value={values.city}
											/>
										</div>
									</div>
									<div className="modal-footer">
										<button
											type="button"
											id="open-fourth-modal"
											className="btn button-primary"
											disabled={values.city ? false : true}
										// data-dismiss="modal"
										>Siguiente</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal fade" id="fourthCommentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel4" tabIndex={-1}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalToggleLabel4">¿Cómo calificas tu experiancia?</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										{	
											(!!values.score && values.score > 0) &&
											<p className="w-100 text-center" >
												{
													values.score === 1 ? "Muy mala" :
													values.score === 2 ? "Mala" :
													values.score === 3 ? "Regular" :
													values.score === 4 ? "Buena" :
													values.score === 5 && "Muy buena"
												}
											</p>
										}
										<div className="w-100 d-flex justify-content-around align-items-center">
											<p className="d-sm-none d-md-block">Muy mala</p>
											<div className="form-group stars">
												<input
													type="radio"
													id="star1"
													name="score"
													value={5}
													onChange={(e) => setFieldValue("score", parseInt(e.target.value))}
													checked={values.score === 5}
												/>
												<label htmlFor="star1"><i className="bi bi-star-fill"></i></label>
												<input
													type="radio"
													id="star2"
													name="score"
													value={4}
													onChange={(e) => setFieldValue("score", parseInt(e.target.value))}
													checked={values.score === 4}
												/>
												<label htmlFor="star2"><i className="bi bi-star-fill"></i></label>
												<input
													type="radio"
													id="star3"
													name="score"
													value={3}
													onChange={(e) => setFieldValue("score", parseInt(e.target.value))}
													checked={values.score === 3}
												/>
												<label htmlFor="star3"><i className="bi bi-star-fill"></i></label>
												<input
													type="radio"
													id="star4"
													name="score"
													value={2}
													onChange={(e) => setFieldValue("score", parseInt(e.target.value))}
													checked={values.score === 2}
												/>
												<label htmlFor="star4"><i className="bi bi-star-fill"></i></label>
												<input
													type="radio"
													id="star5"
													name="score"
													value={1}
													onChange={(e) => setFieldValue("score", parseInt(e.target.value))}
													checked={values.score === 1}
												/>
												<label htmlFor="star5"><i className="bi bi-star-fill"></i></label>
											</div>
											<p className="d-sm-none d-md-block">Muy buena</p>
										</div>
									</div>
									<div className="modal-footer">
										<button
											type="button"
											id="open-fifth-modal"
											className="btn button-primary"
											disabled={values.score ? false : true}
										>Siguiente</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal fade" id="fifthCommentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel5" tabIndex={-1}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalToggleLabel5">Descríbanos su experiencia</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="form-group">
											<textarea
												className="form-control"
												style={{ resize: "none" }}
												rows={4}
												placeholder="Comentarios*"
												id="description"
												name="description"
												onChange={handleChange}
												value={values.description}
											/>
										</div>
									</div>
									<div className="modal-footer">
										<button
											id="open-sixth-modal"
											type="button"
											className="btn button-primary"
											disabled={values.description ? false : true}
										>Siguiente</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal fade" id="sixthCommentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel6" tabIndex={-1}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalToggleLabel6">Gracias por sus comentarios.</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										Tomaremos sus comentarios para mejorar nuestro servicio y así poder proporcionar
										una mejor calidad en nuestra atención y nuestros productos.
									</div>
									<div className="modal-footer">
										<button
											id="close-comment-modal"
											type="submit"
											className="btn button-primary"
											disabled={values.description ? false : true}
										>Terminar</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</>
	);
};

export default CommentModal;
