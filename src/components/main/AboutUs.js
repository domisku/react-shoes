import classes from './AboutUs.module.scss';

function AboutUs() {
  return (
    <div className={classes.container}>
      <h3>A whole wide world of shoes!</h3>
      <p>Get any type of shoe that your heart desires - 
         be it sneakers, sandals, climbing shoes, golf shoes, high-heels, stilletos, flip-flops, cowboy boots, loafers and so much more - we have it all!
         Online shop Shoeworld is a great place for those following the latest trends and people who value high quality products.</p>
      <h3>All the brands!</h3>
      <p>We sell shoes from all the brands that you might need - 
         Adidas, Nike, Dr. Martens, Vans, New Balance, Fila, Geox, Heelys - 
         all you have to do is choose what to order and we will take care of the rest!
         Free shipping for all items! Each new pair of shoes is a new story waiting to be written!
         Create your story today!</p>
      <h3>Free shipping!</h3>
      <p>Free shipping, always, with no exceptions! Doesn't matter where you live, the amount you want to spend.
         But wait, there's more! We also offer 30 days money-back guarantee. We will also pay for any transportation costs
         required to return your shoes in the unfortunate and unlikely event that you were not satisfied with your order!
      </p>
    </div>
  );
}

export default AboutUs;
