import { faker } from '@faker-js/faker';
import { createClient } from 'next-sanity';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Disable CDN for write operations
  token: process.env.SANITY_API_TOKEN, // This is crucial for write operations
});

// School supplies categories
const SCHOOL_CATEGORIES = [
  {
    name: 'Writing Supplies',
    description: 'Pens, pencils, markers, and other writing instruments',
  },
  {
    name: 'Notebooks & Paper',
    description: 'Notebooks, loose leaf paper, sticky notes, and more',
  },
  {
    name: 'Art Supplies',
    description: 'Crayons, colored pencils, paints, and art materials',
  },
  {
    name: 'Organization',
    description: 'Binders, folders, organizers, and storage solutions',
  },
  {
    name: 'Technology',
    description: 'Calculators, USB drives, and tech accessories',
  },
  {
    name: 'Backpacks & Bags',
    description: 'School bags, lunch boxes, and carrying cases',
  },
  {
    name: 'Classroom Supplies',
    description: 'Supplies for teachers and classroom use',
  },
];

// School supplies product data
const SCHOOL_PRODUCTS = {
  'Writing Supplies': [
    { name: 'Blue Ballpoint Pen Pack', basePrice: 5.99, weight: 50 },
    { name: 'Mechanical Pencil Set', basePrice: 8.99, weight: 75 },
    { name: 'Highlighter Set', basePrice: 12.99, weight: 120 },
    { name: 'Fine Tip Markers', basePrice: 15.99, weight: 200 },
    { name: 'Gel Pen Collection', basePrice: 18.99, weight: 150 },
    { name: 'Erasable Pens', basePrice: 9.99, weight: 80 },
    { name: 'Permanent Markers', basePrice: 11.99, weight: 180 },
    { name: 'Pencil Lead Refills', basePrice: 3.99, weight: 25 },
  ],
  'Notebooks & Paper': [
    { name: 'Spiral Notebook', basePrice: 3.99, weight: 300 },
    { name: 'Composition Book', basePrice: 2.99, weight: 280 },
    { name: 'Loose Leaf Paper', basePrice: 4.99, weight: 500 },
    { name: 'Sticky Notes Pack', basePrice: 6.99, weight: 100 },
    { name: 'Graph Paper Notebook', basePrice: 5.99, weight: 320 },
    { name: 'Index Cards', basePrice: 3.49, weight: 150 },
    { name: 'Legal Pad', basePrice: 7.99, weight: 400 },
    { name: 'Planner', basePrice: 19.99, weight: 450 },
  ],
  'Art Supplies': [
    { name: 'Colored Pencil Set', basePrice: 24.99, weight: 250 },
    { name: 'Watercolor Paint Set', basePrice: 16.99, weight: 300 },
    { name: 'Crayon Box', basePrice: 8.99, weight: 200 },
    { name: 'Sketch Pad', basePrice: 12.99, weight: 350 },
    { name: 'Paint Brushes', basePrice: 14.99, weight: 100 },
    { name: 'Glue Sticks', basePrice: 5.99, weight: 120 },
    { name: 'Safety Scissors', basePrice: 7.99, weight: 150 },
    { name: 'Construction Paper', basePrice: 9.99, weight: 400 },
  ],
  'Organization': [
    { name: '3-Ring Binder', basePrice: 12.99, weight: 800 },
    { name: 'File Folders', basePrice: 8.99, weight: 200 },
    { name: 'Desk Organizer', basePrice: 22.99, weight: 600 },
    { name: 'Pencil Case', basePrice: 9.99, weight: 150 },
    { name: 'Accordion File', basePrice: 15.99, weight: 400 },
    { name: 'Storage Bins', basePrice: 18.99, weight: 1200 },
    { name: 'Book Ends', basePrice: 14.99, weight: 900 },
    { name: 'Label Maker', basePrice: 29.99, weight: 500 },
  ],
  'Technology': [
    { name: 'Scientific Calculator', basePrice: 89.99, weight: 300 },
    { name: 'USB Flash Drive', basePrice: 19.99, weight: 50 },
    { name: 'Laptop Stand', basePrice: 39.99, weight: 1500 },
    { name: 'Wireless Mouse', basePrice: 24.99, weight: 200 },
    { name: 'Tablet Case', basePrice: 29.99, weight: 250 },
    { name: 'Headphones', basePrice: 49.99, weight: 400 },
    { name: 'Power Bank', basePrice: 34.99, weight: 350 },
    { name: 'Cable Organizer', basePrice: 12.99, weight: 100 },
  ],
  'Backpacks & Bags': [
    { name: 'Student Backpack', basePrice: 45.99, weight: 800 },
    { name: 'Lunch Bag', basePrice: 16.99, weight: 200 },
    { name: 'Messenger Bag', basePrice: 38.99, weight: 600 },
    { name: 'Gym Bag', basePrice: 28.99, weight: 400 },
    { name: 'Laptop Bag', basePrice: 52.99, weight: 700 },
    { name: 'Pencil Pouch', basePrice: 8.99, weight: 50 },
    { name: 'Rolling Backpack', basePrice: 89.99, weight: 2000 },
    { name: 'Insulated Lunch Box', basePrice: 22.99, weight: 300 },
  ],
  'Classroom Supplies': [
    { name: 'Whiteboard Markers', basePrice: 13.99, weight: 180 },
    { name: 'Stapler', basePrice: 18.99, weight: 400 },
    { name: 'Paper Clips', basePrice: 4.99, weight: 100 },
    { name: 'Rubber Bands', basePrice: 3.99, weight: 80 },
    { name: 'Push Pins', basePrice: 5.99, weight: 60 },
    { name: 'Tape Dispenser', basePrice: 9.99, weight: 200 },
    { name: 'Hole Punch', basePrice: 15.99, weight: 600 },
    { name: 'Bulletin Board', basePrice: 24.99, weight: 1000 },
  ],
};

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function generateProductSpecifications(categoryName: string) {
  const commonSpecs = [
    { name: 'Brand', value: faker.company.name() },
    { name: 'Model', value: faker.string.alphanumeric(8).toUpperCase() },
    { name: 'Color', value: faker.color.human() },
  ];

  const categorySpecificSpecs: Record<string, Array<{name: string, value: string}>> = {
    'Writing Supplies': [
      { name: 'Ink Color', value: faker.helpers.arrayElement(['Blue', 'Black', 'Red']) },
      { name: 'Tip Size', value: faker.helpers.arrayElement(['Fine', 'Medium', 'Bold']) },
    ],
    'Notebooks & Paper': [
      { name: 'Page Count', value: faker.number.int({ min: 50, max: 300 }).toString() },
      { name: 'Paper Type', value: faker.helpers.arrayElement(['Lined', 'Graph', 'Blank']) },
    ],
    'Art Supplies': [
      { name: 'Piece Count', value: faker.number.int({ min: 12, max: 64 }).toString() },
      { name: 'Age Range', value: faker.helpers.arrayElement(['3+', '5+', '8+']) },
    ],
    'Technology': [
      { name: 'Battery Life', value: `${faker.number.int({ min: 6, max: 24 })} hours` },
      { name: 'Compatibility', value: faker.helpers.arrayElement(['Windows', 'Mac', 'Universal']) },
    ],
  };

  return [
    ...commonSpecs,
    ...(categorySpecificSpecs[categoryName] || [])
  ];
}

function generateProductVariants(productName: string) {
  const colors = ['Red', 'Blue', 'Green', 'Black', 'Pink', 'Purple'];
  const variantCount = faker.number.int({ min: 2, max: 4 });

  return Array.from({ length: variantCount }, () => ({
    name: `${productName} - ${faker.helpers.arrayElement(colors)}`,
    price: faker.number.float({ min: 0.5, max: 5, fractionDigits: 2 }),
    // Note: We'll add image reference after uploading images
  }));
}

async function createCategories() {
  console.log('Creating categories...');
  const categoryDocs = [];

  for (const category of SCHOOL_CATEGORIES) {
    const categoryDoc = {
      _type: 'category',
      name: category.name,
      slug: {
        _type: 'slug',
        current: generateSlug(category.name),
      },
      description: category.description,
    };

    try {
      const result = await writeClient.create(categoryDoc);
      categoryDocs.push(result);
      console.log(`✅ Created category: ${category.name}`);
    } catch (error) {
      console.error(`❌ Error creating category ${category.name}:`, error);
    }
  }

  return categoryDocs;
}

async function createProducts(categories: any[]) {
  console.log('Creating products...');
  const allProducts = [];

  for (const category of categories) {
    const categoryProducts = SCHOOL_PRODUCTS[category.name as keyof typeof SCHOOL_PRODUCTS] || [];

    for (const productTemplate of categoryProducts) {
      const isFeatured = faker.datatype.boolean({ probability: 0.2 }); // 20% chance of being featured

      const productDoc = {
        _type: 'product',
        name: productTemplate.name,
        slug: {
          _type: 'slug',
          current: generateSlug(productTemplate.name),
        },
        description: faker.commerce.productDescription(),
        detailedDescription: [
          {
            _type: 'block',
            _key: faker.string.uuid(),
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: faker.string.uuid(),
                text: faker.lorem.paragraphs(2, '\n\n'),
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
        price: faker.number.float({
          min: productTemplate.basePrice * 0.8,
          max: productTemplate.basePrice * 1.2,
          fractionDigits: 2,
        }),
        category: {
          _type: 'reference',
          _ref: category._id,
        },
        specifications: generateProductSpecifications(category.name),
        variants: generateProductVariants(productTemplate.name),
        featured: isFeatured,
        weight: productTemplate.weight + faker.number.int({ min: -20, max: 50 }),
        dimensions: {
          length: faker.number.float({ min: 5, max: 30, fractionDigits: 1 }),
          width: faker.number.float({ min: 3, max: 25, fractionDigits: 1 }),
          height: faker.number.float({ min: 1, max: 15, fractionDigits: 1 }),
        },
        // Note: Images would need to be uploaded separately
        // For now, we'll create the products without images
        images: [], // You can add image references here after uploading images
      };

      try {
        const result = await writeClient.create(productDoc);
        allProducts.push(result);
        console.log(`✅ Created product: ${productTemplate.name}`);
      } catch (error) {
        console.error(`❌ Error creating product ${productTemplate.name}:`, error);
      }
    }
  }

  return allProducts;
}

async function main() {
  try {
    console.log('🚀 Starting Sanity data population...');

    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
    }
    if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable');
    }
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('Missing SANITY_API_TOKEN environment variable');
    }

    console.log(`📡 Connected to project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);

    // Create categories first
    const categories = await createCategories();
    console.log(`📁 Created ${categories.length} categories`);

    // Create products
    const products = await createProducts(categories);
    console.log(`📦 Created ${products.length} products`);

    console.log('✅ Data population completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Products: ${products.length}`);
    console.log('\n💡 Note: You may want to add images to your products manually in the Sanity Studio.');

  } catch (error) {
    console.error('❌ Error during data population:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

export { main };