import React from 'react';
import { 
	Card,
	CardImg,
	CardImgOverlay,
	CardTitle
} from 'reactstrap';

function Menu({ dishes }) {
	const menu = dishes.map(dish => {
		return (
			<div key={dish.id} className="col-12 col-md-5 m-1">
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardImgOverlay>
						<CardTitle>{dish.name}</CardTitle>
					</CardImgOverlay>
				</Card>
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">
				{menu}
			</div>
		</div>
	);
}

export default Menu;
