import { useEffect, useRef } from "react";
import api from "../../api/axios.config";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReviewForm } from "../reviewForm/ReviewForm";

export const Reviews = ({ getMovieData, movie, reviews, setReviews }: any) => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
    console.log(movie);
  }, []);

  const addReview = async (e: any) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      if (rev !== undefined) {
        const response = await api.post("/api/v1/reviews", {
          reviewBody: rev.value,
          imdbId: movieId,
        });

        if (Array.isArray(reviews)) {
          const updatedReviews = [...reviews, { body: rev.value }];
          setReviews(updatedReviews);
        } else {
          setReviews([{ body: rev.value }]);
        }

        revText.current.value = "";

        console.log(reviews);
        console.log(movie);
      } else {
        console.error("revText.current is undefined");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review!"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((review: any) => {
            return (
              <>
                <Row>
                  <Col>{review.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
