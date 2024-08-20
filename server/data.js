import bcrypt from 'bcryptjs'

const data = {
  users: [
    // {
    //   name: 'Helping-Hands',
    //   email: 'helpinghandx2024@gmail.com',
    //   password: bcrypt.hashSync('Pass@1234$'),
    //   isAdmin: true,
    // },
    {
      name: 'Admin | Gloss',
      email: 'gross-investment@consultant.com',
      phone: '08121146164',
      password: bcrypt.hashSync('Pass@1234$'),
      referredBy: '08116274484',
      isAdmin: true,
      bonus: 0,
    },
    {
      name: 'fideBABA',
      email: 'fidenki1429@gmail.com',
      phone: '08103884330',
      password: bcrypt.hashSync('Pass@1234$'),
      referredBy: '08121146164',
      isAdmin: false,
      bonus: 0,
    },
  ],

  products: [
    {
      name: 'Starter',
      slug: 'starter-package',
      category: 'Short-Term',
      image: '/images/starter01.png',
      price: 5000,
      interest: 1500,
      countInStock: 1000000,
      brand: 'Starters',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Silver',
      slug: 'silver-package',
      category: 'Short-Term',
      image: '/images/silver01.png',
      price: 10000,
      interest: 3000,
      countInStock: 1000000,
      brand: 'Silver',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Gold',
      slug: 'gold-package',
      category: 'Medium-Term',
      image: '/images/gold01.png',
      price: 20000,
      interest: 6000,
      countInStock: 1000000,
      brand: 'Gold',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Diamond',
      slug: 'diamond-package',
      category: 'Medium-Term',
      image: '/images/diamond01.png',
      price: 50000,
      interest: 15000,
      countInStock: 1000000,
      brand: 'Diamond',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Platinium',
      slug: 'platinium-package',
      category: 'Medium-Term',
      image: '/images/platinium01.png',
      price: 100000,
      interest: 30000,
      countInStock: 1000000,
      brand: 'Platinium',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Master',
      slug: 'master-package',
      category: 'Medium-Term',
      image: '/images/master03.png',
      price: 200000,
      interest: 60000,
      countInStock: 1000000,
      brand: 'Master',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Grandmaster',
      slug: 'gmaster-package',
      category: 'Long-Term',
      image: '/images/gmaster01.png',
      price: 500000,
      interest: 200000,
      countInStock: 1000000,
      brand: 'Grandmaster',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
    {
      name: 'Legendary',
      slug: 'legend-package',
      category: 'Long-Term',
      image: '/images/legendary04.png',
      price: 1000000,
      interest: 400000,
      countInStock: 1000000,
      brand: 'Legendary',
      rating: 30,
      numReviews: 30,
      description: '30% Interest',
    },
  ],

  // products: [
  //   {
  //     // _id: '1',
  //     name: 'Nike XL Shirt',
  //     slug: 'nike-xl-shirt',
  //     category: 'Shirt',
  //     image: '/images/shirt1.svg',
  //     price: 2000,
  //     countInStock: 10,
  //     brand: 'Nike',
  //     rating: 5,
  //     numReviews: 10,
  //     description: 'High Quality Shirt',
  //   },
  //   {
  //     // _id: '2',
  //     name: 'Nike Slim Shirt',
  //     slug: 'nike-slim-shirt',
  //     category: 'Shirt',
  //     image: '/images/shirt2.svg',
  //     price: 2000,
  //     countInStock: 10,
  //     brand: 'Nike',
  //     rating: 4.5,
  //     numReviews: 12,
  //     description: 'High Quality Shirt',
  //   },

  //   {
  //     // _id: '3',
  //     name: 'Nike Large Shirt',
  //     slug: 'nike-lg-shirt',
  //     category: 'Shirt',
  //     image: '/images/shirt2.svg',
  //     price: 1600,
  //     countInStock: 1500,
  //     brand: 'Nike',
  //     rating: 4,
  //     numReviews: 15,
  //     description: 'High Quality Shirt',
  //   },

  //   {
  //     // _id: '4',
  //     name: 'Nike XL1 Shirt',
  //     slug: 'nike-xl1-shirt',
  //     category: 'Shirt',
  //     image: '/images/shirt1.svg',
  //     price: 1200,
  //     countInStock: 1000,
  //     brand: 'Nike',
  //     rating: 3.5,
  //     numReviews: 8,
  //     description: 'High Quality Shirt',
  //   },

  //   {
  //     // _id: '5',
  //     name: 'Nike XL Pant',
  //     slug: 'nike-xl-pant',
  //     category: 'Pant',
  //     image: '/images/pant1.svg',
  //     price: 1200,
  //     countInStock: 0,
  //     brand: 'Nike',
  //     rating: 3,
  //     numReviews: 14,
  //     description: 'High Quality Shirt',
  //   },

  //   {
  //     // _id: '6',
  //     name: 'Nike L1 Pant',
  //     slug: 'nike-l1-pant',
  //     category: 'Pant',
  //     image: '/images/pant2.svg',
  //     price: 1400,
  //     countInStock: 1000,
  //     brand: 'Nike',
  //     rating: 4.5,
  //     numReviews: 5,
  //     description: 'High Quality Pant',
  //   },

  //   {
  //     // _id: '7',
  //     name: 'Nike SM Pant',
  //     slug: 'nike-sm-pant',
  //     category: 'Pant',
  //     image: '/images/pant3.svg',
  //     price: 1500,
  //     countInStock: 7,
  //     brand: 'Nike',
  //     rating: 4,
  //     numReviews: 3,
  //     description: 'High Quality Pant',
  //   },
  //   {
  //     // _id: '8',
  //     name: 'Nike LL Pant',
  //     slug: 'nike-ll-pant',
  //     category: 'Pant',
  //     image: '/images/pant2.svg',
  //     price: 1000,
  //     countInStock: 0,
  //     brand: 'Nike',
  //     rating: 3,
  //     numReviews: 4,
  //     description: 'High Quality Pant',
  //   },
  // ],
}

export default data
