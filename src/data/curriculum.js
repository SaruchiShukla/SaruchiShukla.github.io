/**
 * ICSE Class 3 (Bangalore) — Maths & Science daily curriculum
 * Each day: Maths 30m → Science 30m → Maths paper 10m → Science paper 10m
 * Papers follow SOF-style olympiad sections; lessons include curated video/site links.
 */

import { getMedia } from './media'
import { getOlympiadQuiz } from './olympiad'

export const APP = {
  name: 'BloomDay',
  tagline: 'Class 3 ICSE · Olympiad prep · Bangalore',
  board: 'ICSE',
  grade: 'Class 3',
  focus: 'IMO / NSO style practice',
  sessionPlan: [
    { id: 'maths-lesson', subject: 'maths', kind: 'lesson', label: 'Maths Course', minutes: 30 },
    { id: 'science-lesson', subject: 'science', kind: 'lesson', label: 'Science Course', minutes: 30 },
    { id: 'maths-quiz', subject: 'maths', kind: 'quiz', label: 'Maths Paper', minutes: 15 },
    { id: 'science-quiz', subject: 'science', kind: 'quiz', label: 'Science Paper', minutes: 15 },
  ],
}

export const SUBJECTS = {
  maths: {
    id: 'maths',
    name: 'Mathematics',
    short: 'Maths',
    color: 'maths',
    blurb: 'ICSE topics + IMO-style logical, concept & achievers practice',
  },
  science: {
    id: 'science',
    name: 'Science',
    short: 'Science',
    color: 'science',
    blurb: 'ICSE topics + NSO-style thinking with videos & site links',
  },
}

/** @typedef {{ q: string, options: string[], answer: number, explain?: string }} Question */
/** @typedef {{ title: string, minutes: number, goals: string[], sections: { heading: string, body: string, tip?: string }[], tryIt: { prompt: string, answer: string }[] }} Lesson */
/** @typedef {{ day: number, title: string, maths: { topic: string, lesson: Lesson, quiz: Question[] }, science: { topic: string, lesson: Lesson, quiz: Question[] } }} DayPlan */

/** @type {DayPlan[]} */
export const DAYS = [
  {
    day: 1,
    title: 'Numbers & Living Things',
    maths: {
      topic: 'Numbers — Place Value',
      lesson: {
        title: 'Place Value up to 9999',
        minutes: 30,
        goals: [
          'Read and write 4-digit numbers',
          'Know thousands, hundreds, tens and ones',
          'Write numbers in expanded form',
        ],
        sections: [
          {
            heading: 'Warm-up',
            body: 'A number like 3,482 has four digits. Each digit has a place that gives it value. The 3 is in the thousands place, so it means 3,000.',
          },
          {
            heading: 'Place chart',
            body: 'Thousands | Hundreds | Tens | Ones\nFor 3,482 → 3 | 4 | 8 | 2\nExpanded form: 3000 + 400 + 80 + 2',
            tip: 'Say the number aloud: “three thousand four hundred eighty-two”.',
          },
          {
            heading: 'Compare & order',
            body: 'To compare two numbers, look at thousands first, then hundreds, then tens, then ones. Bigger digit in the higher place wins.',
          },
          {
            heading: 'Odd and even',
            body: 'If the ones digit is 0, 2, 4, 6 or 8 → even. If it is 1, 3, 5, 7 or 9 → odd.',
          },
        ],
        tryIt: [
          { prompt: 'Expanded form of 2,705?', answer: '2000 + 700 + 5' },
          { prompt: 'Which is greater: 4,189 or 4,198?', answer: '4,198' },
        ],
      },
      quiz: [
        { q: 'In 5,632, the digit 6 is in which place?', options: ['Ones', 'Tens', 'Hundreds', 'Thousands'], answer: 2 },
        { q: 'Expanded form of 4,080 is:', options: ['4000 + 80', '4000 + 800', '400 + 80', '4000 + 8'], answer: 0 },
        { q: 'Which number is even?', options: ['3,451', '2,778', '9,003', '1,117'], answer: 1 },
        { q: 'Successor of 2,999 is:', options: ['2,998', '3,000', '2,990', '3,999'], answer: 1 },
        { q: 'Place value of 7 in 7,215 is:', options: ['7', '70', '700', '7000'], answer: 3 },
        { q: 'Which is the smallest?', options: ['3,506', '3,065', '3,650', '3,056'], answer: 3 },
      ],
    },
    science: {
      topic: 'Living and Non-living Things',
      lesson: {
        title: 'Living vs Non-living',
        minutes: 30,
        goals: [
          'Tell living things from non-living things',
          'List features of living things',
          'Give examples from home and school',
        ],
        sections: [
          {
            heading: 'What makes something living?',
            body: 'Living things grow, need food and water, breathe, move (or respond), and can reproduce. Plants and animals are living.',
          },
          {
            heading: 'Non-living things',
            body: 'A chair, stone, book and ball do not grow or need food. They are non-living. Some non-living things were once living (wood, paper).',
            tip: 'Ask: Does it grow? Does it need food? If no → non-living.',
          },
          {
            heading: 'Bangalore around you',
            body: 'Trees in Cubbon Park are living. The park bench is non-living. Rain water is non-living, but fish in a pond are living.',
          },
        ],
        tryIt: [
          { prompt: 'Is a seed living or non-living?', answer: 'Living (it can grow into a plant)' },
          { prompt: 'Name 2 non-living things in your bag.', answer: 'e.g. pencil, eraser' },
        ],
      },
      quiz: [
        { q: 'Which is a living thing?', options: ['Rock', 'Butterfly', 'Plastic bottle', 'Metal spoon'], answer: 1 },
        { q: 'Living things need:', options: ['Only toys', 'Food, water and air', 'Only sunlight', 'Only books'], answer: 1 },
        { q: 'A wooden chair is:', options: ['Living', 'Non-living', 'Both', 'Neither'], answer: 1 },
        { q: 'Which can grow?', options: ['Car', 'Plant', 'Brick', 'Glass'], answer: 1 },
        { q: 'Reproduction means:', options: ['Sleeping', 'Making more of their kind', 'Running fast', 'Eating sweets'], answer: 1 },
        { q: 'Which was once living?', options: ['Iron nail', 'Cotton cloth', 'Plastic ruler', 'Glass marble'], answer: 1 },
      ],
    },
  },
  {
    day: 2,
    title: 'Addition & Human Body',
    maths: {
      topic: 'Addition of Large Numbers',
      lesson: {
        title: 'Adding 3- and 4-digit Numbers',
        minutes: 30,
        goals: ['Add without and with carry', 'Check addition by estimating', 'Solve word problems'],
        sections: [
          {
            heading: 'Column addition',
            body: 'Write numbers one under the other, lining up ones under ones, tens under tens. Add from the ones place. If the sum is 10 or more, carry to the next place.',
          },
          {
            heading: 'Example',
            body: '2456 + 1789\nOnes: 6+9=15 → write 5, carry 1\nTens: 5+8+1=14 → write 4, carry 1\nHundreds: 4+7+1=12 → write 2, carry 1\nThousands: 2+1+1=4\nAnswer: 4245',
            tip: 'Estimate first: 2500 + 1800 ≈ 4300. Your answer should be nearby.',
          },
          {
            heading: 'Properties',
            body: 'Order does not change the sum (commutative). Adding zero keeps the number the same.',
          },
        ],
        tryIt: [
          { prompt: '1367 + 2548 = ?', answer: '3915' },
          { prompt: 'A school has 1245 girls and 1180 boys. Total children?', answer: '2425' },
        ],
      },
      quiz: [
        { q: '245 + 178 = ?', options: ['413', '423', '323', '433'], answer: 1 },
        { q: 'When ones add up to 15, we write ___ and carry ___', options: ['5 and 1', '15 and 0', '1 and 5', '0 and 15'], answer: 0 },
        { q: '3089 + 1000 = ?', options: ['3189', '4089', '3099', '3989'], answer: 1 },
        { q: '1567 + 0 = ?', options: ['0', '1567', '1568', '1675'], answer: 1 },
        { q: '999 + 1 = ?', options: ['1000', '998', '990', '1099'], answer: 0 },
        { q: 'A shop sold 435 red pens and 278 blue pens. Total pens?', options: ['703', '713', '623', '813'], answer: 1 },
      ],
    },
    science: {
      topic: 'Human Body',
      lesson: {
        title: 'Our Body — Sense Organs & Systems',
        minutes: 30,
        goals: ['Name the five sense organs', 'Know basic body parts and their jobs', 'Practise healthy habits'],
        sections: [
          {
            heading: 'Sense organs',
            body: 'Eyes (see), ears (hear), nose (smell), tongue (taste), skin (touch). They help us know the world safely.',
          },
          {
            heading: 'Inside us',
            body: 'Bones give shape and protect organs. Muscles help us move. The heart pumps blood. Lungs help us breathe. The brain helps us think.',
            tip: 'Exercise, sleep and clean food keep the body strong.',
          },
          {
            heading: 'Care tip',
            body: 'Wash hands before eating. Sit straight while studying. Rest your eyes after screen time.',
          },
        ],
        tryIt: [
          { prompt: 'Which organ pumps blood?', answer: 'Heart' },
          { prompt: 'Name the sense organ for taste.', answer: 'Tongue' },
        ],
      },
      quiz: [
        { q: 'How many sense organs do we have?', options: ['3', '4', '5', '6'], answer: 2 },
        { q: 'We hear with our:', options: ['Nose', 'Ears', 'Skin', 'Tongue'], answer: 1 },
        { q: 'The heart:', options: ['Digests food', 'Pumps blood', 'Sees colour', 'Grows hair only'], answer: 1 },
        { q: 'Bones help to:', options: ['Pump blood', 'Give shape and support', 'Taste food', 'Make rain'], answer: 1 },
        { q: 'Which helps us breathe?', options: ['Lungs', 'Teeth', 'Nails', 'Hair'], answer: 0 },
        { q: 'Before eating we should:', options: ['Run outside', 'Wash hands', 'Skip water', 'Watch TV'], answer: 1 },
      ],
    },
  },
  {
    day: 3,
    title: 'Subtraction & Birds',
    maths: {
      topic: 'Subtraction with Borrowing',
      lesson: {
        title: 'Subtracting 3- and 4-digit Numbers',
        minutes: 30,
        goals: ['Subtract with borrowing', 'Use addition to check', 'Solve difference word problems'],
        sections: [
          {
            heading: 'Borrowing',
            body: 'If the top digit is smaller than the bottom digit, borrow 1 from the next left place. That adds 10 to the current place.',
          },
          {
            heading: 'Example',
            body: '5000 − 2764\nBorrow carefully across zeros.\nAnswer: 2236\nCheck: 2236 + 2764 = 5000 ✓',
            tip: 'Always check by adding the difference to the smaller number.',
          },
        ],
        tryIt: [
          { prompt: '4321 − 2156 = ?', answer: '2165' },
          { prompt: 'A book has 320 pages. Riya read 145. Pages left?', answer: '175' },
        ],
      },
      quiz: [
        { q: '85 − 47 = ?', options: ['48', '38', '42', '28'], answer: 1 },
        { q: '1000 − 1 = ?', options: ['999', '1001', '990', '900'], answer: 0 },
        { q: 'To check 72 − 35 = 37, we do:', options: ['72 + 35', '37 + 35', '72 − 37', '35 − 37'], answer: 1 },
        { q: '604 − 278 = ?', options: ['326', '336', '426', '316'], answer: 0 },
        { q: 'Which is true?', options: ['5 − 0 = 0', '5 − 0 = 5', '0 − 5 = 5', '5 − 5 = 5'], answer: 1 },
        { q: 'A rope is 250 cm. 95 cm is cut. Length left?', options: ['155 cm', '145 cm', '165 cm', '135 cm'], answer: 0 },
      ],
    },
    science: {
      topic: 'Animals — Birds',
      lesson: {
        title: 'Birds — Beaks, Feet & Nest',
        minutes: 30,
        goals: ['Describe bird body parts', 'Link beak/feet to food and habitat', 'Know nesting basics'],
        sections: [
          {
            heading: 'Bird features',
            body: 'Birds have feathers, wings, a beak (no teeth), and lay eggs. Most can fly; some like ostrich cannot.',
          },
          {
            heading: 'Beaks and feet',
            body: 'Eagle: sharp beak and claws for hunting. Duck: flat beak and webbed feet for water. Sparrow: short beak for seeds and insects.',
            tip: 'In Bangalore gardens you may spot mynas, crows, pigeons and sunbirds.',
          },
          {
            heading: 'Nests',
            body: 'Birds build nests with twigs, leaves and mud to lay eggs and keep chicks safe. Do not disturb nests.',
          },
        ],
        tryIt: [
          { prompt: 'Why do ducks have webbed feet?', answer: 'To swim easily in water' },
          { prompt: 'Name one flightless bird.', answer: 'Ostrich / Penguin / Kiwi' },
        ],
      },
      quiz: [
        { q: 'Birds are covered with:', options: ['Fur', 'Scales only', 'Feathers', 'Hair only'], answer: 2 },
        { q: 'Birds do not have:', options: ['Wings', 'Beak', 'Teeth', 'Eyes'], answer: 2 },
        { q: 'Webbed feet help birds to:', options: ['Climb trees', 'Swim', 'Dig burrows', 'Sing'], answer: 1 },
        { q: 'An eagle’s beak is mostly for:', options: ['Sipping nectar', 'Catching prey', 'Filtering mud', 'Cracking only coconuts'], answer: 1 },
        { q: 'Birds lay:', options: ['Seeds', 'Eggs', 'Fruits', 'Nuts'], answer: 1 },
        { q: 'A nest is used to:', options: ['Store cars', 'Keep eggs and chicks safe', 'Cook food', 'Make rain'], answer: 1 },
      ],
    },
  },
  {
    day: 4,
    title: 'Multiplication & Insects',
    maths: {
      topic: 'Multiplication Basics',
      lesson: {
        title: 'Tables & Multiplying by 1-digit',
        minutes: 30,
        goals: ['Recall tables 2–10', 'Multiply 2- and 3-digit by 1-digit', 'See multiplication as repeated addition'],
        sections: [
          {
            heading: 'Meaning',
            body: '4 × 3 means 4 + 4 + 4 = 12. Multiplication is a fast way to add the same number many times.',
          },
          {
            heading: 'Method',
            body: 'Multiply ones first, then tens, then hundreds. Carry when needed.\nExample: 36 × 4 = 144',
            tip: 'Learn tables daily for 5 minutes — it makes bigger sums easy.',
          },
          {
            heading: 'Special facts',
            body: 'Any number × 1 = itself. Any number × 0 = 0. ×10 adds a zero at the end (for whole numbers).',
          },
        ],
        tryIt: [
          { prompt: '7 × 8 = ?', answer: '56' },
          { prompt: '125 × 3 = ?', answer: '375' },
        ],
      },
      quiz: [
        { q: '6 × 7 = ?', options: ['42', '36', '48', '40'], answer: 0 },
        { q: '9 × 0 = ?', options: ['9', '0', '90', '1'], answer: 1 },
        { q: '45 × 2 = ?', options: ['90', '85', '95', '80'], answer: 0 },
        { q: '8 × 1 = ?', options: ['0', '1', '8', '9'], answer: 2 },
        { q: 'Repeated addition 5+5+5 is:', options: ['5 × 2', '5 × 3', '3 × 3', '5 × 5'], answer: 1 },
        { q: 'There are 4 rows of 12 chairs. Total chairs?', options: ['48', '16', '36', '52'], answer: 0 },
      ],
    },
    science: {
      topic: 'Animals — Common Insects',
      lesson: {
        title: 'Insects Around Us',
        minutes: 30,
        goals: ['Know insect body parts', 'Give useful and harmful examples', 'Stay safe around insects'],
        sections: [
          {
            heading: 'Insect body',
            body: 'Insects usually have 3 body parts (head, thorax, abdomen), 6 legs, and often wings. Ants, bees, butterflies and mosquitoes are insects.',
          },
          {
            heading: 'Helpers and pests',
            body: 'Bees make honey and help flowers. Butterflies help pollination. Mosquitoes can spread illness. Termites can damage wood.',
            tip: 'Use mosquito nets / repellent. Do not poke bee hives.',
          },
        ],
        tryIt: [
          { prompt: 'How many legs does an insect have?', answer: 'Six' },
          { prompt: 'Name one useful insect.', answer: 'Bee / Butterfly / Ladybird' },
        ],
      },
      quiz: [
        { q: 'Insects usually have ___ legs.', options: ['4', '6', '8', '10'], answer: 1 },
        { q: 'Which is an insect?', options: ['Spider', 'Scorpion', 'Ant', 'Earthworm'], answer: 2 },
        { q: 'Bees help by:', options: ['Spreading malaria', 'Pollinating flowers', 'Eating wood only', 'Making plastic'], answer: 1 },
        { q: 'Mosquitoes can:', options: ['Make honey', 'Spread diseases', 'Give milk', 'Build nests of twigs only'], answer: 1 },
        { q: 'An insect body has about ___ main parts.', options: ['2', '3', '5', '8'], answer: 1 },
        { q: 'To avoid mosquito bites at night, we can use:', options: ['Open windows only', 'Nets / repellent', 'Bright lights only', 'No water ever'], answer: 1 },
      ],
    },
  },
  {
    day: 5,
    title: 'Division & Plants',
    maths: {
      topic: 'Division',
      lesson: {
        title: 'Sharing Equally — Division',
        minutes: 30,
        goals: ['Understand ÷ as equal sharing', 'Divide 2-digit by 1-digit', 'Know quotient and remainder'],
        sections: [
          {
            heading: 'Idea',
            body: '12 ÷ 3 = 4 means 12 shared into 3 equal groups gives 4 in each group. Or 12 put into groups of 3 makes 4 groups.',
          },
          {
            heading: 'Terms',
            body: 'Dividend ÷ Divisor = Quotient. If something is left, it is the remainder. Remainder is always smaller than the divisor.',
            tip: 'Check: (quotient × divisor) + remainder = dividend.',
          },
          {
            heading: 'Example',
            body: '29 ÷ 4 = 7 remainder 1, because 4×7=28 and 1 is left.',
          },
        ],
        tryIt: [
          { prompt: '36 ÷ 6 = ?', answer: '6' },
          { prompt: '25 ÷ 4 = ? (with remainder)', answer: '6 remainder 1' },
        ],
      },
      quiz: [
        { q: '18 ÷ 3 = ?', options: ['5', '6', '7', '9'], answer: 1 },
        { q: 'In 20 ÷ 5 = 4, the divisor is:', options: ['20', '5', '4', '0'], answer: 1 },
        { q: 'Any number ÷ 1 = ?', options: ['0', '1', 'the number itself', '10'], answer: 2 },
        { q: '17 ÷ 5 = ?', options: ['3 r2', '2 r3', '4 r1', '3 r0'], answer: 0 },
        { q: '0 ÷ 8 = ?', options: ['8', '0', '1', '80'], answer: 1 },
        { q: '24 sweets shared by 6 children. Each gets?', options: ['3', '4', '5', '6'], answer: 1 },
      ],
    },
    science: {
      topic: 'Plants in the Surroundings',
      lesson: {
        title: 'Parts of a Plant',
        minutes: 30,
        goals: ['Name root, stem, leaf, flower, fruit, seed', 'Know each part’s job', 'Observe a local plant'],
        sections: [
          {
            heading: 'Parts and jobs',
            body: 'Roots hold the plant and take water. Stem carries water and keeps the plant upright. Leaves make food using sunlight. Flowers help make seeds. Fruit protects seeds.',
          },
          {
            heading: 'Types',
            body: 'Trees (mango), shrubs (hibiscus), herbs (mint), climbers (money plant). Bangalore balconies often have herbs and flowering plants.',
            tip: 'Water plants at the soil, not only on leaves.',
          },
        ],
        tryIt: [
          { prompt: 'Which part makes food?', answer: 'Leaf' },
          { prompt: 'Name a climber.', answer: 'Money plant / Grapevine / Bean' },
        ],
      },
      quiz: [
        { q: 'Roots mainly:', options: ['Make food', 'Absorb water and hold plant', 'Attract bees only', 'Store sunlight'], answer: 1 },
        { q: 'Food is made in the:', options: ['Root', 'Leaf', 'Flower only', 'Fruit only'], answer: 1 },
        { q: 'The stem:', options: ['Only makes seeds', 'Supports and carries water', 'Only smells nice', 'Digs soil'], answer: 1 },
        { q: 'A mango plant is a:', options: ['Herb', 'Shrub', 'Tree', 'Climber'], answer: 2 },
        { q: 'Seeds are often found inside:', options: ['Leaves', 'Fruits', 'Roots only', 'Bark only'], answer: 1 },
        { q: 'Plants need sunlight to:', options: ['Sleep', 'Make food', 'Walk', 'Talk'], answer: 1 },
      ],
    },
  },
  {
    day: 6,
    title: 'Fractions & Food from Plants',
    maths: {
      topic: 'Fractions',
      lesson: {
        title: 'Understanding Fractions',
        minutes: 30,
        goals: ['Read fractions as parts of a whole', 'Compare like fractions', 'Find fraction of a set'],
        sections: [
          {
            heading: 'Parts of a whole',
            body: 'If a pizza is cut into 4 equal parts and you take 1, you have 1/4. Top number = numerator (parts taken). Bottom = denominator (equal parts in all).',
          },
          {
            heading: 'Same denominator',
            body: 'When denominators are same, the bigger numerator is the bigger fraction. 3/8 > 1/8.',
            tip: 'Equal parts matter — unequal slices are not fair fractions.',
          },
        ],
        tryIt: [
          { prompt: 'Shade 2 parts of 5 equal parts. Fraction?', answer: '2/5' },
          { prompt: 'Which is greater: 2/6 or 5/6?', answer: '5/6' },
        ],
      },
      quiz: [
        { q: 'In 3/4, the denominator is:', options: ['3', '4', '7', '1'], answer: 1 },
        { q: 'Half of a whole is written as:', options: ['1/3', '1/2', '2/1', '1/4'], answer: 1 },
        { q: 'Which is larger?', options: ['1/8', '5/8', '2/8', '3/8'], answer: 1 },
        { q: 'Two equal halves make:', options: ['1/2', '1 whole', '2/4 only', 'Nothing'], answer: 1 },
        { q: '1/4 of 12 apples is:', options: ['2', '3', '4', '6'], answer: 1 },
        { q: 'A circle split into 3 equal parts; 2 shaded. Fraction?', options: ['2/3', '1/3', '3/2', '2/5'], answer: 0 },
      ],
    },
    science: {
      topic: 'Food We Get from Plants',
      lesson: {
        title: 'Plant Foods on Our Plate',
        minutes: 30,
        goals: ['Classify plant foods (root, stem, leaf, fruit, seed)', 'Appreciate a balanced plate', 'Link to Indian meals'],
        sections: [
          {
            heading: 'From different parts',
            body: 'Carrot (root), potato (stem tuber), spinach (leaf), tomato (fruit), rice/wheat (seeds). Sugar comes from sugarcane stem.',
          },
          {
            heading: 'Everyday meals',
            body: 'Idli/dosa use rice and lentils (seeds). Sambar has vegetables from many plant parts. Fruits like banana and mango give energy and vitamins.',
            tip: 'Eat colourful vegetables — each colour brings different nutrients.',
          },
        ],
        tryIt: [
          { prompt: 'Is carrot a root or leaf?', answer: 'Root' },
          { prompt: 'Name a leafy vegetable.', answer: 'Spinach / Methi / Cabbage' },
        ],
      },
      quiz: [
        { q: 'We eat the root of:', options: ['Spinach', 'Carrot', 'Apple', 'Rice'], answer: 1 },
        { q: 'Rice and wheat are mainly:', options: ['Roots', 'Leaves', 'Seeds', 'Flowers'], answer: 2 },
        { q: 'Spinach is a:', options: ['Fruit', 'Leafy vegetable', 'Root', 'Stem sugar'], answer: 1 },
        { q: 'Tomato is botanically a:', options: ['Root', 'Fruit', 'Leaf', 'Bark'], answer: 1 },
        { q: 'Sugarcane gives us:', options: ['Salt', 'Sugar', 'Oil only', 'Milk'], answer: 1 },
        { q: 'A balanced meal should include:', options: ['Only sweets', 'Different plant foods + variety', 'Only fried snacks', 'Only juice'], answer: 1 },
      ],
    },
  },
  {
    day: 7,
    title: 'Money & Matter',
    maths: {
      topic: 'Money',
      lesson: {
        title: 'Rupees and Paise',
        minutes: 30,
        goals: ['Convert rupees ↔ paise', 'Add and subtract money', 'Make simple bills'],
        sections: [
          {
            heading: 'Units',
            body: '₹1 = 100 paise. Write money as ₹45.50 (45 rupees and 50 paise). Line up the decimal point when adding.',
          },
          {
            heading: 'Shopping maths',
            body: 'Cost of items + → total bill. If you pay more, subtract to find change.',
            tip: 'Count change carefully at shops.',
          },
        ],
        tryIt: [
          { prompt: '₹2 = ? paise', answer: '200 paise' },
          { prompt: 'Pencil ₹8, eraser ₹5. Total?', answer: '₹13' },
        ],
      },
      quiz: [
        { q: '₹1 equals:', options: ['10 paise', '50 paise', '100 paise', '1000 paise'], answer: 2 },
        { q: '50 paise + 50 paise =', options: ['₹1', '₹2', '50 paise', '₹0.25'], answer: 0 },
        { q: '₹25.00 + ₹10.50 =', options: ['₹35.50', '₹30.50', '₹35.00', '₹25.50'], answer: 0 },
        { q: 'You pay ₹50 for a ₹38 item. Change?', options: ['₹12', '₹18', '₹22', '₹8'], answer: 0 },
        { q: '₹3 = ___ paise', options: ['3', '30', '300', '3000'], answer: 2 },
        { q: 'Which is greater?', options: ['₹9.90', '₹9.09', '₹9.19', '₹9.50'], answer: 0 },
      ],
    },
    science: {
      topic: 'Forms of Matter',
      lesson: {
        title: 'Solids, Liquids and Gases',
        minutes: 30,
        goals: ['Identify three states of matter', 'Describe shape and flow', 'Give daily examples'],
        sections: [
          {
            heading: 'Three states',
            body: 'Solid: fixed shape and volume (book, ice). Liquid: fixed volume, takes container shape (water, oil). Gas: no fixed shape or volume (air, steam).',
          },
          {
            heading: 'Changes',
            body: 'Ice melts to water (solid→liquid). Water boils to steam (liquid→gas). Steam can cool back to water.',
            tip: 'Matter is made of tiny particles — too small to see.',
          },
        ],
        tryIt: [
          { prompt: 'Is juice a solid, liquid or gas?', answer: 'Liquid' },
          { prompt: 'Name a gas we breathe.', answer: 'Air / Oxygen' },
        ],
      },
      quiz: [
        { q: 'A stone is a:', options: ['Liquid', 'Gas', 'Solid', 'None'], answer: 2 },
        { q: 'Liquids:', options: ['Have fixed shape', 'Take the shape of the container', 'Cannot flow', 'Are always hot'], answer: 1 },
        { q: 'Air is a:', options: ['Solid', 'Liquid', 'Gas', 'Plant'], answer: 2 },
        { q: 'Ice melting becomes:', options: ['Steam only', 'Water', 'Rock', 'Salt'], answer: 1 },
        { q: 'Which has a fixed shape?', options: ['Milk', 'Pencil', 'Steam', 'Oil'], answer: 1 },
        { q: 'Boiling water can turn into:', options: ['Ice only', 'Steam / vapour', 'Wood', 'Sand'], answer: 1 },
      ],
    },
  },
  {
    day: 8,
    title: 'Time & Water Properties',
    maths: {
      topic: 'Time',
      lesson: {
        title: 'Reading the Clock',
        minutes: 30,
        goals: ['Read hours and minutes', 'Know a.m. / p.m.', 'Solve duration problems'],
        sections: [
          {
            heading: 'Clock face',
            body: 'Short hand = hour. Long hand = minutes. 60 minutes = 1 hour. 30 minutes = half hour.',
          },
          {
            heading: 'a.m. and p.m.',
            body: 'a.m. is from midnight to noon. p.m. is from noon to midnight. School often starts in the a.m.',
            tip: 'Our study block today: Maths 30 min + Science 30 min + papers 20 min = 80 minutes.',
          },
        ],
        tryIt: [
          { prompt: 'What time is it when minute hand is on 6 and hour hand between 2 and 3?', answer: '2:30' },
          { prompt: 'From 4:00 to 4:20 is how many minutes?', answer: '20 minutes' },
        ],
      },
      quiz: [
        { q: '1 hour = ___ minutes', options: ['30', '60', '100', '24'], answer: 1 },
        { q: 'The long hand shows:', options: ['Hours', 'Minutes', 'Days', 'Months'], answer: 1 },
        { q: 'Half past 5 is:', options: ['5:00', '5:30', '6:00', '5:15'], answer: 1 },
        { q: 'School at 8 in the morning is:', options: ['8 p.m.', '8 a.m.', '18:00 only', 'Noon'], answer: 1 },
        { q: 'Quarter past 3 is:', options: ['3:15', '3:30', '3:45', '2:15'], answer: 0 },
        { q: 'A 10-minute paper from 5:00 ends at:', options: ['5:05', '5:10', '5:20', '4:50'], answer: 1 },
      ],
    },
    science: {
      topic: 'Properties of Water',
      lesson: {
        title: 'What Water Can Do',
        minutes: 30,
        goals: ['List properties of water', 'Know floating and sinking basics', 'Value clean water'],
        sections: [
          {
            heading: 'Properties',
            body: 'Water is usually colourless, tasteless and odourless when pure. It can dissolve many things (sugar, salt). It flows and takes the shape of its container.',
          },
          {
            heading: 'Float or sink',
            body: 'A leaf may float; a stone sinks. Shape and material matter — a steel ship can float because of its hollow shape.',
            tip: 'Do not waste water — Bangalore needs careful use in dry months.',
          },
        ],
        tryIt: [
          { prompt: 'Does oil mix completely with water?', answer: 'No — it floats as a layer' },
          { prompt: 'Name something that dissolves in water.', answer: 'Salt / Sugar' },
        ],
      },
      quiz: [
        { q: 'Pure water is usually:', options: ['Red', 'Colourless', 'Always sweet', 'Solid always'], answer: 1 },
        { q: 'Water takes the shape of:', options: ['A cube always', 'Its container', 'A ball always', 'Nothing'], answer: 1 },
        { q: 'Salt in water:', options: ['Burns', 'Can dissolve', 'Becomes a gas at once', 'Turns to ice'], answer: 1 },
        { q: 'A heavy stone in a bucket of water usually:', options: ['Floats', 'Sinks', 'Flies', 'Evaporates'], answer: 1 },
        { q: 'We should:', options: ['Waste water', 'Use water carefully', 'Pour clean water into drains for fun', 'Ignore leaks'], answer: 1 },
        { q: 'Water is a:', options: ['Solid always', 'Liquid (at room feel)', 'Metal', 'Gas only'], answer: 1 },
      ],
    },
  },
  {
    day: 9,
    title: 'Length & Water Resource',
    maths: {
      topic: 'Measurement — Length',
      lesson: {
        title: 'Measuring Length',
        minutes: 30,
        goals: ['Use cm and m', 'Convert simple lengths', 'Add/subtract lengths'],
        sections: [
          {
            heading: 'Units',
            body: '100 cm = 1 m. Use centimetres for a pencil; metres for a room or playground.',
          },
          {
            heading: 'Reading a ruler',
            body: 'Place 0 at the start of the object. Read the mark at the end. Estimate before measuring.',
            tip: 'Stand straight against a wall to compare heights in cm.',
          },
        ],
        tryIt: [
          { prompt: '2 m = ? cm', answer: '200 cm' },
          { prompt: '45 cm + 30 cm = ?', answer: '75 cm' },
        ],
      },
      quiz: [
        { q: '1 m = ___ cm', options: ['10', '100', '1000', '50'], answer: 1 },
        { q: 'Best unit for a book’s length:', options: ['Kilometre', 'Centimetre', 'Litre', 'Kilogram'], answer: 1 },
        { q: '3 m = ___ cm', options: ['30', '300', '3', '3000'], answer: 1 },
        { q: '80 cm − 25 cm =', options: ['55 cm', '65 cm', '45 cm', '105 cm'], answer: 0 },
        { q: 'Which is longer?', options: ['90 cm', '1 m', '80 cm', '50 cm'], answer: 1 },
        { q: 'A ribbon 120 cm is how many metres?', options: ['1.2 m', '12 m', '0.12 m', '120 m'], answer: 0 },
      ],
    },
    science: {
      topic: 'Water as a Resource',
      lesson: {
        title: 'Saving and Using Water',
        minutes: 30,
        goals: ['Know sources of water', 'List uses of water', 'Practise saving water at home'],
        sections: [
          {
            heading: 'Sources',
            body: 'Rain, rivers, lakes, wells and taps (treated water). In cities, water is cleaned before it reaches homes.',
          },
          {
            heading: 'Save water',
            body: 'Close taps tightly. Take shorter showers. Reuse RO wastewater for plants if safe. Fix leaks. Collect rainwater where possible.',
            tip: 'Every drop counts in Bengaluru summers.',
          },
        ],
        tryIt: [
          { prompt: 'Name 2 uses of water at home.', answer: 'Drinking, cooking, cleaning, bathing…' },
          { prompt: 'One way to save water?', answer: 'Close tap while brushing / fix leaks' },
        ],
      },
      quiz: [
        { q: 'A natural source of water is:', options: ['Plastic bottle factory', 'Rain', 'TV', 'Pencil'], answer: 1 },
        { q: 'We need water for:', options: ['Only games', 'Drinking, cooking, cleaning', 'Only painting', 'Nothing'], answer: 1 },
        { q: 'Leaving the tap open while brushing:', options: ['Saves water', 'Wastes water', 'Cleans air', 'Makes ice'], answer: 1 },
        { q: 'Rainwater harvesting helps to:', options: ['Waste water', 'Save and store water', 'Make plastic', 'Stop plants growing'], answer: 1 },
        { q: 'Drinking water should be:', options: ['Dirty', 'Clean and safe', 'Salty always', 'Oily'], answer: 1 },
        { q: 'Which saves water?', options: ['Long open-tap wash', 'Fixing a leaking tap', 'Water fights daily', 'Ignoring drips'], answer: 1 },
      ],
    },
  },
  {
    day: 10,
    title: 'Weight & The Sun',
    maths: {
      topic: 'Measurement — Weight',
      lesson: {
        title: 'Grams and Kilograms',
        minutes: 30,
        goals: ['Use g and kg', 'Convert 1000 g = 1 kg', 'Compare weights'],
        sections: [
          {
            heading: 'Units',
            body: 'Light things (eraser) → grams (g). Heavier things (rice bag) → kilograms (kg). 1000 g = 1 kg.',
          },
          {
            heading: 'Balance scale',
            body: 'A beam balance compares two sides. Digital scales show the number directly.',
          },
        ],
        tryIt: [
          { prompt: '2 kg = ? g', answer: '2000 g' },
          { prompt: 'Which is heavier: 500 g or 1 kg?', answer: '1 kg' },
        ],
      },
      quiz: [
        { q: '1 kg = ___ g', options: ['10', '100', '1000', '500'], answer: 2 },
        { q: 'Best unit for a watermelon:', options: ['Milligram', 'Kilogram', 'Kilometre', 'Litre'], answer: 1 },
        { q: '500 g + 500 g =', options: ['1 kg', '2 kg', '100 g', '500 kg'], answer: 0 },
        { q: 'Which is lighter?', options: ['2 kg', '1500 g', '1 kg', '3000 g'], answer: 2 },
        { q: '250 g is ___ of a kilogram', options: ['1/2', '1/4', '1/3', '1/5'], answer: 1 },
        { q: 'A packet of 2 kg sugar and 500 g tea weighs:', options: ['2 kg', '2.5 kg', '3 kg', '1.5 kg'], answer: 1 },
      ],
    },
    science: {
      topic: 'Sun as a Natural Resource',
      lesson: {
        title: 'The Sun — Our Star',
        minutes: 30,
        goals: ['Know sun gives heat and light', 'Link sun to plants and weather', 'Practise sun safety'],
        sections: [
          {
            heading: 'Why the sun matters',
            body: 'The sun gives light and heat. Plants need sunlight to make food. Sunlight helps dry clothes and warms the Earth.',
          },
          {
            heading: 'Safety',
            body: 'Do not look directly at the sun. Use a cap/sunscreen in strong afternoon sun. Morning sunlight is gentler for play.',
            tip: 'Solar energy can power lights and heaters — clean energy!',
          },
        ],
        tryIt: [
          { prompt: 'What do plants need from the sun?', answer: 'Light (to make food)' },
          { prompt: 'Should we stare at the sun?', answer: 'No' },
        ],
      },
      quiz: [
        { q: 'The sun gives us:', options: ['Only rain', 'Heat and light', 'Only wind', 'Plastic'], answer: 1 },
        { q: 'Plants use sunlight to:', options: ['Make food', 'Sleep only', 'Walk', 'Talk'], answer: 0 },
        { q: 'Looking straight at the sun is:', options: ['Safe', 'Harmful for eyes', 'Required daily', 'A game'], answer: 1 },
        { q: 'Solar energy comes from:', options: ['Coal only', 'The sun', 'The moon only', 'Ice'], answer: 1 },
        { q: 'Without the sun, Earth would be:', options: ['Warmer always', 'Very cold and dark', 'Made of candy', 'Silent only'], answer: 1 },
        { q: 'A good sun-safety habit is:', options: ['No water', 'Cap / shade in strong sun', 'Staring at noon sun', 'Bare feet on hot tar'], answer: 1 },
      ],
    },
  },
  {
    day: 11,
    title: 'Capacity & Hygiene',
    maths: {
      topic: 'Measurement — Capacity',
      lesson: {
        title: 'Litres and Millilitres',
        minutes: 30,
        goals: ['Use ml and L', 'Know 1000 ml = 1 L', 'Solve capacity word problems'],
        sections: [
          {
            heading: 'Units',
            body: 'Milk, water and juice are measured in millilitres (ml) and litres (L). 1000 ml = 1 L.',
          },
          {
            heading: 'Everyday sizes',
            body: 'A small medicine cup may be 5–10 ml. A water bottle is often 500 ml or 1 L. A bucket may hold many litres.',
          },
        ],
        tryIt: [
          { prompt: '2 L = ? ml', answer: '2000 ml' },
          { prompt: '500 ml + 500 ml = ? L', answer: '1 L' },
        ],
      },
      quiz: [
        { q: '1 L = ___ ml', options: ['10', '100', '1000', '500'], answer: 2 },
        { q: 'Best unit for a drop of medicine:', options: ['Kilometre', 'Millilitre', 'Kilogram', 'Metre'], answer: 1 },
        { q: '750 ml + 250 ml =', options: ['1 L', '2 L', '500 ml', '100 ml'], answer: 0 },
        { q: 'Which is more?', options: ['900 ml', '1 L', '800 ml', '500 ml'], answer: 1 },
        { q: 'A 2 L bottle filled halfway has:', options: ['2 L', '1 L', '500 ml', '250 ml'], answer: 1 },
        { q: '3 L − 1 L 200 ml =', options: ['1 L 800 ml', '2 L 200 ml', '1 L 200 ml', '2 L 800 ml'], answer: 0 },
      ],
    },
    science: {
      topic: 'Cleanliness, Health and Hygiene',
      lesson: {
        title: 'Stay Clean, Stay Healthy',
        minutes: 30,
        goals: ['List daily hygiene habits', 'Know why germs matter', 'Keep study space tidy'],
        sections: [
          {
            heading: 'Daily habits',
            body: 'Bath regularly, brush teeth twice, wash hands before eating and after toilet, wear clean clothes, trim nails.',
          },
          {
            heading: 'Home and school',
            body: 'Cover food. Throw trash in bins. Keep water covered. Sleep enough. Play outdoors for fresh air.',
            tip: 'Hygiene keeps germs away and helps you feel energetic for study.',
          },
        ],
        tryIt: [
          { prompt: 'When should you wash hands?', answer: 'Before eating / after toilet / after play' },
          { prompt: 'Why cover food?', answer: 'To keep away dust and flies/germs' },
        ],
      },
      quiz: [
        { q: 'We should brush teeth:', options: ['Once a week', 'Twice a day', 'Never', 'Only on Sundays'], answer: 1 },
        { q: 'Wash hands before:', options: ['Sleeping only', 'Eating', 'Watching TV only', 'Nothing'], answer: 1 },
        { q: 'Throwing litter on the road is:', options: ['Good', 'Unhygienic', 'Healthy', 'Required'], answer: 1 },
        { q: 'Covering food helps:', options: ['Invite flies', 'Keep germs/dust away', 'Spoil food faster', 'Waste water'], answer: 1 },
        { q: 'Clean nails help prevent:', options: ['Germs under nails', 'Reading', 'Running', 'Smiling'], answer: 0 },
        { q: 'A healthy habit is:', options: ['Skipping sleep', 'Playing in fresh air', 'Eating only junk', 'No water'], answer: 1 },
      ],
    },
  },
  {
    day: 12,
    title: 'Geometry & Safety',
    maths: {
      topic: 'Geometry — Shapes',
      lesson: {
        title: 'Shapes, Lines and Corners',
        minutes: 30,
        goals: ['Name 2D shapes', 'Count sides and corners', 'Spot shapes in the room'],
        sections: [
          {
            heading: 'Flat shapes',
            body: 'Triangle (3 sides), square (4 equal sides), rectangle (opposite sides equal), circle (curved, no corners).',
          },
          {
            heading: 'Lines',
            body: 'A straight path between two points is a line segment. Edges of a book are line segments. Corners are vertices.',
            tip: 'Look around: clock face (circle), door (rectangle), sandwich cut (triangle).',
          },
        ],
        tryIt: [
          { prompt: 'How many corners in a triangle?', answer: '3' },
          { prompt: 'Does a circle have sides?', answer: 'No straight sides' },
        ],
      },
      quiz: [
        { q: 'A triangle has ___ sides.', options: ['2', '3', '4', '5'], answer: 1 },
        { q: 'A square has sides that are:', options: ['All equal', 'All different', 'Only two equal', 'Curved'], answer: 0 },
        { q: 'A circle has:', options: ['4 corners', '3 corners', 'No corners', '2 corners'], answer: 2 },
        { q: 'Opposite sides equal describes a:', options: ['Circle', 'Rectangle', 'Triangle only', 'Oval only'], answer: 1 },
        { q: 'A corner of a shape is also called a:', options: ['Side', 'Vertex', 'Centre only', 'Curve'], answer: 1 },
        { q: 'A stop-sign shape in many places has ___ sides (octagon).', options: ['5', '6', '7', '8'], answer: 3 },
      ],
    },
    science: {
      topic: 'Safety and First Aid',
      lesson: {
        title: 'Stay Safe at Home & Road',
        minutes: 30,
        goals: ['Know basic safety rules', 'Remember simple first aid', 'Know emergency contacts idea'],
        sections: [
          {
            heading: 'Home safety',
            body: 'Do not play with fire, matchsticks or electric sockets. Keep floors dry to avoid slips. Use scissors carefully.',
          },
          {
            heading: 'Road safety',
            body: 'Use zebra crossings / footpaths. Look right-left-right. Wear a helmet on two-wheelers. Never run onto the road.',
            tip: 'For small cuts: wash, dry, apply antiseptic, bandage. Tell an adult.',
          },
        ],
        tryIt: [
          { prompt: 'What should you do before crossing a road?', answer: 'Stop, look right-left-right' },
          { prompt: 'If you get a small cut?', answer: 'Tell adult, wash, antiseptic, bandage' },
        ],
      },
      quiz: [
        { q: 'Playing with electric plugs is:', options: ['Safe', 'Dangerous', 'A good game', 'Required'], answer: 1 },
        { q: 'On the road we should use:', options: ['Middle of highway', 'Footpath / crossing rules', 'Any random place', 'Closed eyes'], answer: 1 },
        { q: 'For a small cut, first:', options: ['Hide it', 'Tell an adult and clean it', 'Rub mud', 'Ignore forever'], answer: 1 },
        { q: 'A helmet on a scooter helps protect:', options: ['Shoes', 'Head', 'Books only', 'Phone only'], answer: 1 },
        { q: 'Wet floors can cause:', options: ['Slips and falls', 'Better running', 'Magic', 'Sleep'], answer: 0 },
        { q: 'If someone is badly hurt, we should:', options: ['Do nothing', 'Call adult / emergency help', 'Laugh', 'Film only'], answer: 1 },
      ],
    },
  },
  {
    day: 13,
    title: 'Patterns & Weather',
    maths: {
      topic: 'Patterns',
      lesson: {
        title: 'Number and Shape Patterns',
        minutes: 30,
        goals: ['Find the rule in a pattern', 'Continue patterns', 'Make your own pattern'],
        sections: [
          {
            heading: 'Number patterns',
            body: '2, 4, 6, 8… add 2 each time. 5, 10, 15, 20… add 5. 81, 72, 63… subtract 9.',
          },
          {
            heading: 'Shape patterns',
            body: '▲●▲●▲●… repeats. Growing patterns get bigger each step.',
          },
        ],
        tryIt: [
          { prompt: 'Next in 3, 6, 9, 12, __?', answer: '15' },
          { prompt: 'Next in 40, 35, 30, 25, __?', answer: '20' },
        ],
      },
      quiz: [
        { q: 'Next: 10, 20, 30, 40, __', options: ['45', '50', '60', '35'], answer: 1 },
        { q: 'Rule for 2, 4, 6, 8 is:', options: ['Add 1', 'Add 2', 'Multiply by 3', 'Subtract 2'], answer: 1 },
        { q: 'Next: 100, 90, 80, 70, __', options: ['60', '65', '50', '75'], answer: 0 },
        { q: 'In ●■●■●■ the next is:', options: ['●', '■', '▲', '◆'], answer: 0 },
        { q: '5, 10, 15, 20 follows:', options: ['Add 10', 'Add 5', 'Add 2', 'Add 15'], answer: 1 },
        { q: 'Next: 1, 2, 4, 8, __ (double each time)', options: ['10', '12', '16', '9'], answer: 2 },
      ],
    },
    science: {
      topic: 'Weather',
      lesson: {
        title: 'Weather We Feel',
        minutes: 30,
        goals: ['Describe sunny, rainy, cloudy, windy', 'Dress for weather', 'Know seasons simply'],
        sections: [
          {
            heading: 'Daily weather',
            body: 'Weather is how the air feels today — hot, cold, rainy, windy or cloudy. It can change during the day.',
          },
          {
            heading: 'Bangalore note',
            body: 'Bengaluru often has pleasant weather, but summer can be hot and monsoon brings rain. Carry a bottle of water; use a raincoat when needed.',
            tip: 'Weather is day-to-day; climate is the usual pattern over years.',
          },
        ],
        tryIt: [
          { prompt: 'What do you wear on a rainy day?', answer: 'Raincoat / umbrella' },
          { prompt: 'Name today’s weather in one word.', answer: '(child’s observation)' },
        ],
      },
      quiz: [
        { q: 'Weather means:', options: ['Only mountains', 'Day-to-day condition of air', 'Only oceans', 'School timetable'], answer: 1 },
        { q: 'On a rainy day we use:', options: ['Sunglasses only', 'Umbrella / raincoat', 'Woollen coat always', 'Nothing'], answer: 1 },
        { q: 'A cloudy day has:', options: ['No sky', 'Many clouds', 'Only snow always', 'No air'], answer: 1 },
        { q: 'Wind is moving:', options: ['Soil', 'Air', 'Books', 'Rocks'], answer: 1 },
        { q: 'In hot weather we should:', options: ['Drink water', 'Wear heavy wool always', 'Avoid shade', 'Run without rest'], answer: 0 },
        { q: 'Weather can:', options: ['Never change', 'Change during the day', 'Only be sunny forever', 'Stop time'], answer: 1 },
      ],
    },
  },
  {
    day: 14,
    title: 'Data Handling & Soil',
    maths: {
      topic: 'Data Handling',
      lesson: {
        title: 'Pictographs',
        minutes: 30,
        goals: ['Read a pictograph', 'Count using a key', 'Answer questions from a chart'],
        sections: [
          {
            heading: 'Pictograph',
            body: 'A pictograph uses pictures to show data. A key might say: 1 ☺ = 2 children. Count pictures carefully.',
          },
          {
            heading: 'Example',
            body: 'Favourite fruit: Mango 🍎🍎🍎 (1 apple pic = 1 vote) → 3 votes for mango.',
            tip: 'Title + labels + key make a chart clear.',
          },
        ],
        tryIt: [
          { prompt: 'If 1 ★ = 5 books and you see 4 ★, how many books?', answer: '20' },
          { prompt: 'Why do charts need a key?', answer: 'To know what each picture stands for' },
        ],
      },
      quiz: [
        { q: 'A pictograph uses:', options: ['Only words', 'Pictures/symbols', 'Only music', 'Only maps'], answer: 1 },
        { q: 'If 1 ☺ = 2 children and there are 3 ☺, total children =', options: ['3', '5', '6', '2'], answer: 2 },
        { q: 'A key in a chart tells:', options: ['Jokes', 'What each symbol means', 'The weather only', 'Nothing'], answer: 1 },
        { q: 'Data means:', options: ['Random noise', 'Collected information', 'Only drawings', 'Only songs'], answer: 1 },
        { q: 'Which is better to compare class votes quickly?', options: ['A pictograph', 'A secret whisper', 'No record', 'A single word'], answer: 0 },
        { q: 'If mango has 8 votes and apple 5, mango has ___ more.', options: ['2', '3', '4', '13'], answer: 1 },
      ],
    },
    science: {
      topic: 'Land and Soil',
      lesson: {
        title: 'Soil Under Our Feet',
        minutes: 30,
        goals: ['Know soil supports plants', 'List soil types simply', 'Protect soil'],
        sections: [
          {
            heading: 'Why soil matters',
            body: 'Soil holds roots and has water, air and nutrients plants need. Worms help keep soil healthy.',
          },
          {
            heading: 'Care',
            body: 'Do not throw plastic on soil. Plant trees. Compost kitchen scraps where possible.',
          },
        ],
        tryIt: [
          { prompt: 'Name one thing found in soil.', answer: 'Water / air / minerals / worms' },
          { prompt: 'How can we help soil?', answer: 'No litter / plant trees / compost' },
        ],
      },
      quiz: [
        { q: 'Plants grow well in:', options: ['Only plastic', 'Soil', 'Only glass', 'Only metal'], answer: 1 },
        { q: 'Earthworms in soil are:', options: ['Always harmful', 'Helpful', 'Made of plastic', 'Birds'], answer: 1 },
        { q: 'Throwing plastic on soil is:', options: ['Good', 'Harmful', 'Required', 'A nutrient'], answer: 1 },
        { q: 'Soil gives plants:', options: ['TV signals', 'Support, water and nutrients', 'Only shade', 'Wings'], answer: 1 },
        { q: 'Composting kitchen waste can:', options: ['Pollute always', 'Enrich soil', 'Stop rain', 'Make plastic'], answer: 1 },
        { q: 'Roots hold the plant in the:', options: ['Sky', 'Soil', 'Clouds', 'Moon'], answer: 1 },
      ],
    },
  },
  {
    day: 15,
    title: 'Revision Mixed Pack A',
    maths: {
      topic: 'Mixed Practice — Numbers & Operations',
      lesson: {
        title: 'Maths Revision Trail',
        minutes: 30,
        goals: ['Revisit place value, + − × ÷', 'Build speed with accuracy', 'Prepare for today’s paper'],
        sections: [
          {
            heading: 'Quick recap',
            body: 'Place value → compare numbers. Addition/subtraction with carry/borrow. Tables for multiplication. Division as equal sharing.',
          },
          {
            heading: 'Strategy',
            body: 'Estimate first. Show working in columns. Check with the opposite operation.',
            tip: 'Spend a few minutes on tables before the paper.',
          },
        ],
        tryIt: [
          { prompt: '456 + 278 = ?', answer: '734' },
          { prompt: '9 × 6 = ?', answer: '54' },
        ],
      },
      quiz: [
        { q: 'Place value of 5 in 4,502 is:', options: ['5', '50', '500', '5000'], answer: 2 },
        { q: '693 − 257 = ?', options: ['436', '446', '426', '536'], answer: 0 },
        { q: '8 × 7 = ?', options: ['54', '56', '63', '49'], answer: 1 },
        { q: '72 ÷ 8 = ?', options: ['8', '9', '7', '6'], answer: 1 },
        { q: 'Which is odd?', options: ['244', '258', '273', '280'], answer: 2 },
        { q: '₹40 − ₹18 = ?', options: ['₹22', '₹28', '₹12', '₹32'], answer: 0 },
      ],
    },
    science: {
      topic: 'Mixed Practice — Living World',
      lesson: {
        title: 'Science Revision Trail',
        minutes: 30,
        goals: ['Revisit living things, body, birds, insects, plants', 'Use examples from daily life', 'Get ready for the paper'],
        sections: [
          {
            heading: 'Mind map',
            body: 'Living vs non-living → body senses → birds & insects → plant parts & food from plants.',
          },
          {
            heading: 'How to answer',
            body: 'Read the question twice. Eliminate wrong options. Think of a real example you have seen.',
          },
        ],
        tryIt: [
          { prompt: 'Name 5 sense organs.', answer: 'Eyes, ears, nose, tongue, skin' },
          { prompt: 'One difference: living vs non-living.', answer: 'Living grow / need food…' },
        ],
      },
      quiz: [
        { q: 'A crow is:', options: ['Non-living', 'Living', 'A mineral', 'A liquid'], answer: 1 },
        { q: 'We smell with our:', options: ['Tongue', 'Nose', 'Ear', 'Eye'], answer: 1 },
        { q: 'Insects have ___ legs.', options: ['4', '6', '8', '2'], answer: 1 },
        { q: 'Leaves help plants to:', options: ['Make food', 'Only dance', 'Dig', 'Sleep underground only'], answer: 0 },
        { q: 'Birds are covered with:', options: ['Fur', 'Feathers', 'Plastic', 'Bark'], answer: 1 },
        { q: 'Carrot is mostly a:', options: ['Leaf', 'Root', 'Flower', 'Wing'], answer: 1 },
      ],
    },
  },
  {
    day: 16,
    title: 'Revision Mixed Pack B',
    maths: {
      topic: 'Mixed Practice — Measures & Shapes',
      lesson: {
        title: 'Measures & Shapes Recap',
        minutes: 30,
        goals: ['Revise length, weight, capacity, time, money', 'Name shapes confidently', 'Solve mixed problems'],
        sections: [
          {
            heading: 'Unit ladder',
            body: '100 cm = 1 m; 1000 g = 1 kg; 1000 ml = 1 L; 60 min = 1 hour; 100 paise = ₹1.',
          },
          {
            heading: 'Shapes flash',
            body: 'Triangle 3, square 4 equal, rectangle opposite equal, circle curved.',
          },
        ],
        tryIt: [
          { prompt: '90 min = ? hours ? minutes', answer: '1 hour 30 minutes' },
          { prompt: 'How many sides does a rectangle have?', answer: '4' },
        ],
      },
      quiz: [
        { q: '2 kg = ___ g', options: ['200', '2000', '20', '2500'], answer: 1 },
        { q: 'Half past 7 is:', options: ['7:00', '7:30', '6:30', '7:15'], answer: 1 },
        { q: 'A square has ___ equal sides.', options: ['2', '3', '4', '5'], answer: 2 },
        { q: '500 ml is half of:', options: ['1 L', '2 L', '100 ml', '5 L'], answer: 0 },
        { q: '₹5 = ___ paise', options: ['5', '50', '500', '5000'], answer: 2 },
        { q: '3 m = ___ cm', options: ['30', '300', '3000', '3'], answer: 1 },
      ],
    },
    science: {
      topic: 'Mixed Practice — Matter, Water, Sun, Hygiene',
      lesson: {
        title: 'Earth Resources Recap',
        minutes: 30,
        goals: ['Revise states of matter', 'Water & sun care', 'Hygiene and safety'],
        sections: [
          {
            heading: 'Flash points',
            body: 'Solid/liquid/gas → water properties & saving → sun heat/light & safety → clean habits & road safety.',
          },
        ],
        tryIt: [
          { prompt: 'Name the three states of matter.', answer: 'Solid, liquid, gas' },
          { prompt: 'One way to save water.', answer: 'Close taps / shorter showers / fix leaks' },
        ],
      },
      quiz: [
        { q: 'Milk is a:', options: ['Solid', 'Liquid', 'Gas', 'Shape'], answer: 1 },
        { q: 'The sun gives:', options: ['Heat and light', 'Only plastic', 'Only soil', 'Only noise'], answer: 0 },
        { q: 'Saving water is:', options: ['Useless', 'Important', 'Forbidden', 'Only for rain'], answer: 1 },
        { q: 'Wash hands before eating to reduce:', options: ['Germs', 'Homework', 'Sleep', 'Sunlight'], answer: 0 },
        { q: 'Air is a:', options: ['Solid', 'Liquid', 'Gas', 'Plant'], answer: 2 },
        { q: 'Crossing the road: we should:', options: ['Run without looking', 'Stop and look both ways', 'Close eyes', 'Play ball'], answer: 1 },
      ],
    },
  },
  {
    day: 17,
    title: 'Roman Numerals & Environment',
    maths: {
      topic: 'Roman Numerals',
      lesson: {
        title: 'Roman Numbers I to XX',
        minutes: 30,
        goals: ['Read I, V, X and combinations', 'Write 1–20 in Roman', 'Spot Romans on clocks'],
        sections: [
          {
            heading: 'Symbols',
            body: 'I=1, V=5, X=10. II=2, III=3, IV=4, VI=6, IX=9, XIV=14, XX=20.',
          },
          {
            heading: 'Rules',
            body: 'Usually write larger values left. I before V or X means subtract (IV=4, IX=9).',
            tip: 'Many clock faces still use Roman numerals.',
          },
        ],
        tryIt: [
          { prompt: 'Write 8 in Roman.', answer: 'VIII' },
          { prompt: 'What is XII?', answer: '12' },
        ],
      },
      quiz: [
        { q: 'V stands for:', options: ['1', '5', '10', '15'], answer: 1 },
        { q: 'IX means:', options: ['11', '9', '8', '6'], answer: 1 },
        { q: 'X means:', options: ['5', '10', '20', '1'], answer: 1 },
        { q: 'XIV is:', options: ['16', '14', '15', '24'], answer: 1 },
        { q: '8 in Roman is:', options: ['VIII', 'IIX', 'VIIII', 'XII'], answer: 0 },
        { q: 'XX is:', options: ['10', '15', '20', '22'], answer: 2 },
      ],
    },
    science: {
      topic: 'Our Environment',
      lesson: {
        title: 'Caring for Our Environment',
        minutes: 30,
        goals: ['Know what environment includes', 'Reduce-reuse-recycle idea', 'Be a green citizen in Bangalore'],
        sections: [
          {
            heading: 'Environment',
            body: 'Everything around us — air, water, land, plants, animals and people — forms our environment.',
          },
          {
            heading: 'Our part',
            body: 'Reduce waste, reuse bags/bottles, recycle paper. Plant a sapling. Keep lakes and parks clean.',
            tip: 'Segregate wet and dry waste at home if your building does.',
          },
        ],
        tryIt: [
          { prompt: 'Name one way to reduce plastic.', answer: 'Carry cloth bag / reuse bottle' },
          { prompt: 'Why are trees useful?', answer: 'Clean air, shade, homes for birds…' },
        ],
      },
      quiz: [
        { q: 'Environment includes:', options: ['Only toys', 'Air, water, land, living things', 'Only phones', 'Only indoors'], answer: 1 },
        { q: 'Reusing a bottle helps:', options: ['Increase waste', 'Reduce waste', 'Cut trees', 'Pollute more'], answer: 1 },
        { q: 'Throwing trash in a lake is:', options: ['Helpful', 'Harmful', 'Required', 'Healthy for fish'], answer: 1 },
        { q: 'Planting trees:', options: ['Harms air', 'Helps the environment', 'Stops rain forever', 'Removes oxygen always'], answer: 1 },
        { q: 'Reduce–Reuse–Recycle is about:', options: ['Wasting more', 'Managing waste wisely', 'Ignoring litter', 'Burning all plastic at home'], answer: 1 },
        { q: 'Keeping parks clean is:', options: ['Everyone’s responsibility', 'Nobody’s job', 'Only for birds', 'Useless'], answer: 0 },
      ],
    },
  },
  {
    day: 18,
    title: 'Word Problems & Earth–Moon',
    maths: {
      topic: 'Word Problems Lab',
      lesson: {
        title: 'Solving Story Sums',
        minutes: 30,
        goals: ['Spot + − × ÷ in stories', 'Write number sentences', 'Check answers'],
        sections: [
          {
            heading: 'Steps',
            body: '1) Read carefully 2) Underline numbers and question 3) Choose operation 4) Solve 5) Check if the answer makes sense.',
          },
          {
            heading: 'Clue words',
            body: 'Total / altogether → add. Left / difference → subtract. Groups of / times → multiply. Shared equally → divide.',
          },
        ],
        tryIt: [
          { prompt: 'Ravi had 48 stickers. He gave 15. How many left?', answer: '33' },
          { prompt: '6 shelves with 9 books each. Total?', answer: '54' },
        ],
      },
      quiz: [
        { q: 'A box has 24 pencils. 8 are used. Left?', options: ['16', '32', '18', '14'], answer: 0 },
        { q: '3 packets of 12 biscuits. Total?', options: ['15', '36', '24', '30'], answer: 1 },
        { q: '36 children in 4 equal rows. Each row?', options: ['8', '9', '6', '12'], answer: 1 },
        { q: '₹100 spent ₹45. Remaining?', options: ['₹55', '₹65', '₹45', '₹155'], answer: 0 },
        { q: 'A rope 18 m; cut into 2 m pieces. How many pieces?', options: ['8', '9', '16', '20'], answer: 1 },
        { q: 'Library had 250 books; got 125 more. Total?', options: ['375', '125', '350', '275'], answer: 0 },
      ],
    },
    science: {
      topic: 'The Earth and the Moon',
      lesson: {
        title: 'Earth, Moon and Sky',
        minutes: 30,
        goals: ['Know Earth is our planet', 'Know Moon goes around Earth', 'Observe day and night idea'],
        sections: [
          {
            heading: 'Earth',
            body: 'Earth is our home planet. It has land and water. It goes around the Sun. It also spins — giving day and night.',
          },
          {
            heading: 'Moon',
            body: 'The Moon is Earth’s neighbour in space. It goes around the Earth. We see moonlight which is reflected sunlight. The Moon’s shape seems to change (phases).',
            tip: 'Never look at the sun to compare — use books/apps for sky learning.',
          },
        ],
        tryIt: [
          { prompt: 'What gives us day and night?', answer: 'Earth spinning / rotation' },
          { prompt: 'Does the Moon make its own light?', answer: 'No — it reflects sunlight' },
        ],
      },
      quiz: [
        { q: 'We live on planet:', options: ['Moon', 'Earth', 'Sun', 'Mars only'], answer: 1 },
        { q: 'Day and night happen because Earth:', options: ['Is square', 'Spins / rotates', 'Is made of water only', 'Stops moving'], answer: 1 },
        { q: 'The Moon goes around the:', options: ['Sun only never Earth', 'Earth', 'Cars', 'Trees'], answer: 1 },
        { q: 'Moonlight is mostly:', options: ['Moon’s own fire', 'Reflected sunlight', 'Electricity', 'Candle light'], answer: 1 },
        { q: 'Earth goes around the:', options: ['Moon', 'Sun', 'School', 'Ocean only'], answer: 1 },
        { q: 'The Moon’s shape looking different is called:', options: ['Phases', 'Rain', 'Soil', 'Germs'], answer: 0 },
      ],
    },
  },
  {
    day: 19,
    title: 'Challenge Day — Maths Focus',
    maths: {
      topic: 'Challenge Problems',
      lesson: {
        title: 'Stretch Your Maths Brain',
        minutes: 30,
        goals: ['Combine skills in multi-step sums', 'Explain reasoning aloud', 'Stay calm under timer'],
        sections: [
          {
            heading: 'Multi-step thinking',
            body: 'Some problems need two steps — e.g. multiply then subtract. Write each step clearly.',
          },
          {
            heading: 'Today’s focus',
            body: 'Work the try-it problems slowly, then attempt the 10-minute paper with full concentration.',
          },
        ],
        tryIt: [
          { prompt: 'A school has 8 classes of 32 students. 15 are absent. How many present?', answer: '241' },
          { prompt: 'Find 1/4 of 36.', answer: '9' },
        ],
      },
      quiz: [
        { q: '4 × 25 − 30 = ?', options: ['70', '80', '60', '100'], answer: 0 },
        { q: 'Half of 98 is:', options: ['48', '49', '50', '58'], answer: 1 },
        { q: 'The smallest 4-digit number is:', options: ['9999', '1000', '1111', '0001'], answer: 1 },
        { q: '15 minutes is ___ of an hour', options: ['1/2', '1/3', '1/4', '1/5'], answer: 2 },
        { q: 'A square’s side is 6 cm. Perimeter (all sides)?', options: ['12 cm', '18 cm', '24 cm', '36 cm'], answer: 2 },
        { q: '7 hundreds + 5 ones =', options: ['75', '705', '750', '570'], answer: 1 },
      ],
    },
    science: {
      topic: 'Stars & Night Sky',
      lesson: {
        title: 'Sun and Stars',
        minutes: 30,
        goals: ['Know sun is a star', 'Understand stars look tiny due to distance', 'Stay curious about space'],
        sections: [
          {
            heading: 'Stars',
            body: 'Stars are huge balls of hot glowing gases. The Sun is the nearest star to Earth. Other stars look like tiny points because they are very far.',
          },
          {
            heading: 'Night sky',
            body: 'We see stars at night when the sky is dark. City lights can hide faint stars — a darker place shows more.',
          },
        ],
        tryIt: [
          { prompt: 'Is the Sun a star?', answer: 'Yes' },
          { prompt: 'Why do stars look small?', answer: 'They are very far away' },
        ],
      },
      quiz: [
        { q: 'The Sun is a:', options: ['Planet', 'Star', 'Moon', 'Comet only'], answer: 1 },
        { q: 'Stars look tiny because they are:', options: ['Actually pebbles', 'Very far', 'Painted', 'Ice cubes'], answer: 1 },
        { q: 'We usually see many stars at:', options: ['Noon only', 'Night', 'Inside a closed box', 'Underground'], answer: 1 },
        { q: 'The nearest star to Earth is:', options: ['Any random star', 'The Sun', 'The Moon', 'A satellite'], answer: 1 },
        { q: 'Stars are made of hot:', options: ['Mud', 'Gases', 'Plastic', 'Wood'], answer: 1 },
        { q: 'City lights at night can:', options: ['Create new stars', 'Make faint stars harder to see', 'Stop Earth spinning', 'Cool the Sun'], answer: 1 },
      ],
    },
  },
  {
    day: 20,
    title: 'Challenge Day — Science Focus',
    maths: {
      topic: 'Speed Round Foundations',
      lesson: {
        title: 'Accuracy under Time',
        minutes: 30,
        goals: ['Practise quick facts', 'Avoid careless errors', 'Review wrong try-its'],
        sections: [
          {
            heading: 'Warm tables',
            body: 'Say tables 6, 7, 8, 9 aloud. Then do 5 mental additions.',
          },
          {
            heading: 'Common traps',
            body: 'Align place values. Don’t forget carry/borrow. Read ₹ and units carefully.',
          },
        ],
        tryIt: [
          { prompt: '999 + 26 = ?', answer: '1025' },
          { prompt: '8 × 9 = ?', answer: '72' },
        ],
      },
      quiz: [
        { q: '6000 + 400 + 20 + 5 =', options: ['6425', '6245', '6452', '4625'], answer: 0 },
        { q: '54 ÷ 6 =', options: ['8', '9', '7', '6'], answer: 1 },
        { q: 'III + VII in Roman (as numbers) =', options: ['8', '10', '9', '11'], answer: 1 },
        { q: '2/8 compared to 6/8:', options: ['Greater', 'Smaller', 'Equal', 'Cannot say'], answer: 1 },
        { q: '1 hour 15 min = ___ min', options: ['75', '60', '115', '45'], answer: 0 },
        { q: 'Perimeter of a triangle sides 3,4,5 cm =', options: ['12 cm', '60 cm', '9 cm', '15 cm'], answer: 0 },
      ],
    },
    science: {
      topic: 'Full Science Challenge',
      lesson: {
        title: 'Science Explorer Challenge',
        minutes: 30,
        goals: ['Connect topics across the syllabus', 'Explain with examples', 'Celebrate learning'],
        sections: [
          {
            heading: 'Big picture',
            body: 'Living world → body & habits → matter & water → sun & sky → environment & safety. Science is observing carefully.',
          },
          {
            heading: 'Bangalore link',
            body: 'Notice trees, birds, weather and water use around your neighbourhood — science is outside the textbook too.',
          },
        ],
        tryIt: [
          { prompt: 'Name one living and one non-living thing in your room.', answer: 'e.g. plant / plant pot' },
          { prompt: 'Why is hygiene important?', answer: 'Prevents germs / keeps us healthy' },
        ],
      },
      quiz: [
        { q: 'Which pair is correct?', options: ['Ice–gas', 'Water–liquid', 'Steam–solid', 'Stone–liquid'], answer: 1 },
        { q: 'Pollination is helped by:', options: ['Bees', 'Stones', 'Plastic bags', 'Only cars'], answer: 0 },
        { q: 'We should not:', options: ['Save water', 'Look directly at the sun', 'Wash hands', 'Wear clean clothes'], answer: 1 },
        { q: 'A nest is for:', options: ['Cars', 'Bird eggs/chicks', 'Books only', 'Rain only'], answer: 1 },
        { q: 'Segregating waste helps the:', options: ['Environment', 'Moon phases', 'Multiplication tables', 'Roman numerals'], answer: 0 },
        { q: 'Sense organ for touch:', options: ['Ear', 'Skin', 'Only hair', 'Only teeth'], answer: 1 },
      ],
    },
  },
  {
    day: 21,
    title: 'Celebration & Checkpoint',
    maths: {
      topic: 'Checkpoint Paper Prep',
      lesson: {
        title: 'You Did It — Final Maths Lap',
        minutes: 30,
        goals: ['Review favourite topics', 'Note tricky areas to revisit', 'Finish strong on the paper'],
        sections: [
          {
            heading: 'Pride list',
            body: 'You practised numbers, operations, fractions, money, time, measures, shapes, patterns, data and Romans across 21 days!',
          },
          {
            heading: 'Parent tip',
            body: 'Repeat any day using the day picker. Short daily practice beats long rare sessions.',
          },
        ],
        tryIt: [
          { prompt: 'Write one topic you feel confident in.', answer: '(child’s answer)' },
          { prompt: 'Write one topic to practise again.', answer: '(child’s answer)' },
        ],
      },
      quiz: [
        { q: 'Greatest 3-digit number is:', options: ['100', '999', '900', '99'], answer: 1 },
        { q: '0 × 57 =', options: ['57', '0', '1', '570'], answer: 1 },
        { q: '₹2.50 + ₹3.50 =', options: ['₹5', '₹6', '₹7', '₹5.50'], answer: 1 },
        { q: 'A rectangle has ___ corners.', options: ['2', '3', '4', '0'], answer: 2 },
        { q: '1000 − 10 =', options: ['990', '910', '999', '900'], answer: 0 },
        { q: '1/2 of 20 =', options: ['5', '10', '15', '2'], answer: 1 },
      ],
    },
    science: {
      topic: 'Checkpoint Paper Prep',
      lesson: {
        title: 'You Did It — Final Science Lap',
        minutes: 30,
        goals: ['Celebrate science curiosity', 'Retake weak days anytime', 'Keep observing the world'],
        sections: [
          {
            heading: 'Scientist habit',
            body: 'Ask “why?”, observe, and connect textbook ideas to home, park and school.',
          },
          {
            heading: 'Keep going',
            body: 'BloomDay days can be repeated. Mix Maths and Science every day for 80 focused minutes.',
          },
        ],
        tryIt: [
          { prompt: 'Favourite science topic?', answer: '(child’s answer)' },
          { prompt: 'One healthy habit you will keep?', answer: '(child’s answer)' },
        ],
      },
      quiz: [
        { q: 'Living things can:', options: ['Only sit forever', 'Grow and need food', 'Never change', 'Avoid air always'], answer: 1 },
        { q: 'Roots take in:', options: ['Only sunlight food', 'Water and minerals', 'Only music', 'Only plastic'], answer: 1 },
        { q: 'Lungs help us:', options: ['Digest only', 'Breathe', 'See', 'Hear'], answer: 1 },
        { q: 'Saving water in Bengaluru is:', options: ['Unimportant', 'Important', 'Impossible to think about', 'Only for oceans'], answer: 1 },
        { q: 'A solid has:', options: ['No shape', 'Fixed shape', 'Only gas form', 'No volume ever'], answer: 1 },
        { q: 'Washing hands is part of:', options: ['Hygiene', 'Geometry only', 'Roman numerals', 'Pictographs only'], answer: 0 },
      ],
    },
  },
]

export function getDay(dayNumber) {
  const base = DAYS.find((d) => d.day === dayNumber) ?? DAYS[0]
  const media = getMedia(base.day)
  return {
    ...base,
    maths: {
      ...base.maths,
      quiz: getOlympiadQuiz(base.day, 'maths'),
      videos: media.maths.videos,
      sites: media.maths.sites,
    },
    science: {
      ...base.science,
      quiz: getOlympiadQuiz(base.day, 'science'),
      videos: media.science.videos,
      sites: media.science.sites,
    },
  }
}

export function getTodayDayNumber() {
  // Rotate through curriculum by calendar day-of-year so “today” always maps
  const start = new Date(new Date().getFullYear(), 0, 0)
  const now = new Date()
  const diff = Math.floor((now - start) / 86400000)
  return ((diff - 1) % DAYS.length) + 1
}
