<Card>
  <Card.Img
    variant="top"
    src={product.imageUrl}
    alt={product.title}
    className="smaller-image"
    style={{ border: "none", padding: 0 }}
  />
  <Card.Body>
    <Button variant="primary" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
    <Card.Text>${product.price}</Card.Text>
  </Card.Body>
</Card>
