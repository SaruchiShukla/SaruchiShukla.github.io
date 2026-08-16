/**
 * Builds 15 topic-mapped olympiad-style MCQs (Logical · Concept · Achievers).
 * Deterministic from day + subject so scores stay stable across reloads.
 */

function Q(level, q, options, answer, explain) {
  return { level, q, options, answer, explain }
}

const L = 'logical'
const C = 'concept'
const A = 'achievers'

function mulberry32(a) {
  return function rand() {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)]
}

function shuffle(rand, arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function mcq(level, prompt, correct, wrongs, explain, rand) {
  const right = String(correct)
  const uniqWrong = []
  for (const w of wrongs) {
    const s = String(w)
    if (s !== right && !uniqWrong.includes(s)) uniqWrong.push(s)
  }
  let pad = 1
  const asNum = Number(right)
  while (uniqWrong.length < 3) {
    const filler =
      Number.isFinite(asNum) && right.trim() !== '' && !Number.isNaN(asNum)
        ? String(asNum + pad * 3 + 1)
        : `Choice ${pad}`
    pad += 1
    if (filler !== right && !uniqWrong.includes(filler)) uniqWrong.push(filler)
    if (pad > 20) break
  }
  while (uniqWrong.length < 3) uniqWrong.push(`Choice ${uniqWrong.length + 1}`)
  const opts = shuffle(rand, [right, ...uniqWrong.slice(0, 3)])
  return Q(level, prompt, opts, opts.indexOf(right), explain)
}

function irand(rand, min, max) {
  return min + Math.floor(rand() * (max - min + 1))
}

/** Maths generators by family */
const MATHS = {
  place(rand, day) {
    const n = 1000 + irand(rand, 0, 8999)
    const s = String(n).padStart(4, '0')
    const places = ['Thousands', 'Hundreds', 'Tens', 'Ones']
    const di = irand(rand, 0, 3)
    const digit = Number(s[di])
    const pv = digit * [1000, 100, 10, 1][di]
    return [
      mcq(L, `Odd one out: ${n}, ${n + 2}, ${n + 4}, ${n + 7}`, String(n + 7), [String(n), String(n + 2), String(n + 4)], 'Others rise by 2.', rand),
      mcq(L, `What comes next? ${n}, ${n + 1000}, ${n + 2000}, ___`, String(n + 3000), [String(n + 2500), String(n + 1000), String(n + 4000)], 'Add 1000 each time.', rand),
      mcq(C, `In ${n.toLocaleString('en-IN')}, digit ${digit} is in the ___ place.`, places[di], places.filter((_, i) => i !== di), `Look at place chart.`, rand),
      mcq(C, `Place value of ${digit} in ${n.toLocaleString('en-IN')} is:`, String(pv), [String(digit), String(digit * 10), String(digit * 100)].filter((x) => x !== String(pv)).slice(0, 3), `${digit} × place = ${pv}.`, rand),
      mcq(C, `Expanded form of ${n} starts with:`, String(Number(s[0]) * 1000), [String(n), String(Number(s[1]) * 100), '0'], 'Thousands first.', rand),
      mcq(C, `Successor of ${n} is:`, String(n + 1), [String(n - 1), String(n + 10), String(n + 100)], 'One more.', rand),
      mcq(C, `Predecessor of ${n} is:`, String(n - 1), [String(n + 1), String(n - 10), String(n)], 'One less.', rand),
      mcq(C, `Smallest 4-digit number is:`, '1000', ['999', '1001', '1111'], '1000 is smallest 4-digit.', rand),
      mcq(C, `Greatest number using digits of ${s} once:`, [...s].sort((a, b) => b - a).join(''), [[...s].sort().join(''), s, String(n + 1)], 'Arrange descending.', rand),
      mcq(A, `How many whole numbers from ${n} to ${n + 4} inclusive?`, '5', ['4', '3', '6'], 'Count inclusive.', rand),
      mcq(A, `${n} + 10 =`, String(n + 10), [String(n + 1), String(n + 100), String(n - 10)], 'Add one ten.', rand),
      mcq(A, `Face value of tens digit in ${n} is:`, s[2], [String(Number(s[2]) * 10), places[2], s[3]], 'Face value = the digit itself.', rand),
      mcq(L, `If □${s[1]}${s[2]}${s[3]} is between ${n - 50} and ${n + 50}, □ could be:`, s[0], [String((Number(s[0]) + 1) % 10), '9', '0'], 'Match thousands digit.', rand),
      mcq(A, `${n} rounded feeling nearest 10 leans to:`, n % 10 >= 5 ? String(Math.ceil(n / 10) * 10) : String(Math.floor(n / 10) * 10), [String(n), String(n + 50), '0'], 'Look at ones digit.', rand),
      mcq(C, `Day ${day} place-value check: ${n} has ___ digits.`, '4', ['3', '5', '2'], 'Count digits.', rand),
    ]
  },

  compare(rand) {
    const a = irand(rand, 1000, 9000)
    const b = a + irand(rand, -80, 80) || a + 3
    const bigger = Math.max(a, b)
    const smaller = Math.min(a, b)
    return [
      mcq(L, `Which is greater: ${a} or ${b}?`, String(bigger), [String(smaller), String(a + b), 'Equal always'], 'Compare place by place.', rand),
      mcq(C, `${a} > ${b} is:`, a > b ? 'True' : 'False', [a > b ? 'False' : 'True', 'Cannot say', 'Both'], 'Compare thousands first.', rand),
      mcq(C, `Ascending order of ${bigger}, ${smaller}:`, `${smaller}, ${bigger}`, [`${bigger}, ${smaller}`, `${bigger}, ${bigger}`, 'Same'], 'Small → large.', rand),
      mcq(C, `Descending order starts with:`, String(bigger), [String(smaller), '0', String(bigger - smaller)], 'Largest first.', rand),
      mcq(L, `Odd one (largest): ${a}, ${b}, ${Math.min(a, b) - 5}`, String(bigger), [String(smaller), String(Math.min(a, b) - 5), String(a)], 'Find largest.', rand),
      mcq(C, `${smaller} is ___ than ${bigger}.`, 'less', ['greater', 'equal', 'double'], 'Smaller means less.', rand),
      mcq(A, `Difference ${bigger} − ${smaller} =`, String(bigger - smaller), [String(bigger + smaller), '0', String(smaller)], 'Subtract.', rand),
      mcq(C, `Numbers between ${smaller} and ${smaller + 3}:`, '2', ['1', '3', '4'], 'Exclusive count.', rand),
      mcq(L, `Pattern size: if A>B and B>C then:`, 'A>C', ['A<C', 'A=C', 'Cannot say'], 'Transitive.', rand),
      mcq(C, `Greatest 3-digit number:`, '999', ['1000', '100', '900'], '999.', rand),
      mcq(C, `Least 4-digit number:`, '1000', ['999', '1111', '1001'], '1000.', rand),
      mcq(A, `${a} compared to ${a}:`, 'Equal', ['Greater', 'Less', 'Unknown'], 'Same number.', rand),
      mcq(A, `Which symbol for ${bigger} vs ${smaller}?`, '>', ['<', '=', '÷'], 'Greater than.', rand),
      mcq(L, `Arrange 3, 1, 2 ascending as places of day:`, '1, 2, 3', ['3, 2, 1', '2, 1, 3', '1, 3, 2'], 'Small to large.', rand),
      mcq(C, `To compare, first look at:`, 'Highest place', ['Ones only', 'Colour', 'Length of word'], 'Highest place decides.', rand),
    ]
  },

  'odd-even': (rand) => {
    const e = irand(rand, 1, 40) * 2
    const o = e + 1
    return [
      mcq(C, `${e} is:`, 'Even', ['Odd', 'Prime only', 'Fraction'], 'Ones digit even.', rand),
      mcq(C, `${o} is:`, 'Odd', ['Even', 'Zero', 'Ten'], 'Ones digit odd.', rand),
      mcq(L, `Odd one: ${e}, ${e + 2}, ${e + 4}, ${o}`, String(o), [String(e), String(e + 2), String(e + 4)], 'Odd among evens.', rand),
      mcq(C, `Even + even =`, 'Even', ['Odd', 'Zero always', 'Fraction'], 'Even+even=even.', rand),
      mcq(C, `Odd + odd =`, 'Even', ['Odd', 'Always 1', 'Always 0'], 'Odd+odd=even.', rand),
      mcq(C, `Even + odd =`, 'Odd', ['Even', 'Zero', 'Ten'], 'Even+odd=odd.', rand),
      mcq(A, `Next even after ${e}:`, String(e + 2), [String(e + 1), String(e + 3), String(e)], 'Add 2.', rand),
      mcq(A, `How many even numbers from ${e} to ${e + 6} inclusive?`, '4', ['3', '5', '6'], 'Count by 2s.', rand),
      mcq(L, `If ones digit is 7, number is:`, 'Odd', ['Even', 'Multiple of 10', 'Zero'], '7 is odd.', rand),
      mcq(C, `All multiples of 2 are:`, 'Even', ['Odd', 'Fractions', 'Negative'], 'Definition.', rand),
      mcq(C, `0 is:`, 'Even', ['Odd', 'Neither', 'Prime'], '0 is even.', rand),
      mcq(A, `${e} × 2 is:`, 'Even', ['Odd', 'Cannot say', 'Prime'], 'Even×anything whole is even (if integer).', rand),
      mcq(A, `${o} × ${e} is:`, 'Even', ['Odd', '1', '0'], 'Even factor → even product.', rand),
      mcq(L, `Pair that are both odd:`, `${o} and ${o + 2}`, [`${e} and ${e + 2}`, `${e} and ${o}`, `${e} only`], 'Both odd.', rand),
      mcq(C, `Ones digit of even number can be:`, '0,2,4,6,8', ['1,3,5,7,9', 'Only 5', 'Only 9'], 'Even ones digits.', rand),
    ]
  },

  round(rand) {
    const n = irand(rand, 25, 980)
    const to10 = Math.round(n / 10) * 10
    const to100 = Math.round(n / 100) * 100
    return [
      mcq(C, `Round ${n} to nearest 10:`, String(to10), [String(n), String(to100), String(n + 1)], 'Look at ones.', rand),
      mcq(C, `Round ${n} to nearest 100:`, String(to100), [String(to10), String(n), '0'], 'Look at tens.', rand),
      mcq(L, `Numbers that round to ${to10} (nearest 10) are near:`, String(to10), [String(to10 + 50), '1', String(n * 2)], 'Within 5.', rand),
      mcq(C, `If ones digit ≥ 5, round:`, 'Up', ['Down', 'Stay', 'Delete'], 'Rule.', rand),
      mcq(C, `If ones digit < 5, round:`, 'Down', ['Up', 'Double', 'Skip'], 'Rule.', rand),
      mcq(A, `Estimate ${n} + 12 ≈ (nearest 10)`, String(to10 + 10), [String(n + 12), String(to100), '0'], 'Round then add.', rand),
      mcq(C, `45 to nearest 10:`, '50', ['40', '45', '55'], '5 rounds up.', rand),
      mcq(C, `14 to nearest 10:`, '10', ['20', '14', '0'], '4 < 5.', rand),
      mcq(A, `150 to nearest 100:`, '200', ['100', '150', '250'], 'Tens digit 5 → up.', rand),
      mcq(L, `Best estimate for ${n}:`, String(to10), [String(n * 10), '1', String(n - 1000)], 'Nearest ten.', rand),
      mcq(C, `Rounding makes numbers:`, 'Easier to work with', ['Always smaller', 'Always larger', 'Exact always'], 'Estimation.', rand),
      mcq(A, `${n} is closer to ${to10} than to ${to10 + 20}?`, Math.abs(n - to10) <= Math.abs(n - (to10 + 20)) ? 'Yes' : 'No', ['Maybe', 'Never', 'Only if even'], 'Compare distances.', rand),
      mcq(C, `Nearest 10 of 99:`, '100', ['90', '99', '110'], 'Round up.', rand),
      mcq(A, `Day estimate check: 248 ≈`, '250', ['200', '240', '300'], 'Nearest 10.', rand),
      mcq(L, `Odd one (already a ten): 20, 21, 30, 40`, '21', ['20', '30', '40'], '21 not multiple of 10.', rand),
    ]
  },

  roman(rand) {
    const map = [
      [1, 'I'],
      [2, 'II'],
      [3, 'III'],
      [4, 'IV'],
      [5, 'V'],
      [6, 'VI'],
      [7, 'VII'],
      [8, 'VIII'],
      [9, 'IX'],
      [10, 'X'],
      [11, 'XI'],
      [12, 'XII'],
      [15, 'XV'],
      [20, 'XX'],
      [40, 'XL'],
      [50, 'L'],
    ]
    const [n, r] = pick(rand, map)
    const [n2, r2] = pick(rand, map.filter((x) => x[0] !== n))
    return [
      mcq(C, `Roman for ${n} is:`, r, [r2, 'C', 'D'], 'Match chart.', rand),
      mcq(C, `${r} means:`, String(n), [String(n2), '100', '0'], 'Decode.', rand),
      mcq(C, `V equals:`, '5', ['1', '10', '50'], 'V=5.', rand),
      mcq(C, `X equals:`, '10', ['5', '1', '50'], 'X=10.', rand),
      mcq(C, `IV equals:`, '4', ['6', '5', '3'], 'I before V.', rand),
      mcq(C, `IX equals:`, '9', ['11', '8', '10'], 'I before X.', rand),
      mcq(L, `Odd one: I, II, III, VVV`, 'VVV', ['I', 'II', 'III'], 'VVV not standard.', rand),
      mcq(A, `X + V =`, 'XV', ['VX', 'XX', 'V'], '10+5=15.', rand),
      mcq(A, `XX − V =`, 'XV', ['XXV', 'V', 'X'], '20−5=15.', rand),
      mcq(C, `L equals:`, '50', ['100', '10', '5'], 'L=50.', rand),
      mcq(C, `XII is:`, '12', ['11', '22', '2'], 'X+I+I.', rand),
      mcq(L, `Which is larger: X or V?`, 'X', ['V', 'Equal', 'I'], '10>5.', rand),
      mcq(A, `Clock 4 often written:`, 'IIII or IV', ['XXXX', 'LL', 'C'], 'Clock style.', rand),
      mcq(C, `Roman numerals use letters like:`, 'I V X L', ['A B C', 'Only Z', 'Digits 7-9 only'], 'Classic set.', rand),
      mcq(A, `${r} + I closest meaning:`, String(n + 1), [String(n), String(n2), '0'], 'Add one.', rand),
    ]
  },

  add(rand) {
    const a = irand(rand, 100, 800)
    const b = irand(rand, 100, 800)
    const sum = a + b
    return [
      mcq(C, `${a} + ${b} =`, String(sum), [String(sum + 10), String(sum - 10), String(a - b)], 'Add carefully.', rand),
      mcq(C, `${a} + 0 =`, String(a), [String(a + 1), '0', String(b)], 'Adding 0.', rand),
      mcq(L, `If ${a} + □ = ${sum}, □ =`, String(b), [String(a), String(sum), '1'], 'Missing addend.', rand),
      mcq(C, `Ones digit of ${a}+${b}:`, String(sum % 10), [String(a % 10), String(b % 10), '9'], 'Add ones.', rand),
      mcq(A, `${a} + 999 ≈ ${a}+1000 then:`, 'Subtract 1', ['Add 1', '×2', '÷2'], '999=1000−1.', rand),
      mcq(C, `Carry is needed when ones sum ≥`, '10', ['2', '5', '1'], 'Regroup.', rand),
      mcq(L, `Pattern: ${a}, ${a + 10}, ${a + 20}, ___`, String(a + 30), [String(a + 25), String(a + 5), String(sum)], 'Add 10.', rand),
      mcq(A, `Sum of ${a} and ${b} is even?`, sum % 2 === 0 ? 'Yes' : 'No', [sum % 2 === 0 ? 'No' : 'Yes', 'Always', 'Never'], 'Parity of sum.', rand),
      mcq(C, `250 + 250 =`, '500', ['400', '450', '550'], '250+250.', rand),
      mcq(C, `199 + 1 =`, '200', ['198', '190', '201'], 'Next hundred.', rand),
      mcq(A, `Forgot carry of 1 ten → answer less by:`, '10', ['1', '100', '1000'], 'One ten.', rand),
      mcq(L, `Which sum is largest?`, String(Math.max(a + b, a + 50, b + 50)), [String(Math.min(a, b)), '0', String(a)], 'Compare sums.', rand),
      mcq(C, `Commutative: ${a}+${b} =`, `${b}+${a}`, [`${a}−${b}`, `${b}−${a}`, `${a}×${b}`], 'Order free.', rand),
      mcq(A, `${sum} − ${a} =`, String(b), [String(a), String(sum), '0'], 'Inverse.', rand),
      mcq(C, `Add 10 to ${a}:`, String(a + 10), [String(a + 1), String(a + 100), String(a - 10)], 'Tens place +1.', rand),
    ]
  },

  sub(rand) {
    const a = irand(rand, 400, 900)
    const b = irand(rand, 50, 350)
    const d = a - b
    return [
      mcq(C, `${a} − ${b} =`, String(d), [String(d + 10), String(a + b), String(b - a + 1000)], 'Subtract.', rand),
      mcq(C, `${a} − 0 =`, String(a), ['0', String(a - 1), String(b)], 'Subtract 0.', rand),
      mcq(L, `If ${a} − □ = ${d}, □ =`, String(b), [String(a), String(d), '1'], 'Missing subtrahend.', rand),
      mcq(C, `Borrowing needed if ones of minuend < ones of subtrahend?`, 'Yes', ['No', 'Never', 'Only for 0'], 'Regroup.', rand),
      mcq(A, `${a} − ${b} + ${b} =`, String(a), [String(d), String(b), '0'], 'Inverse ops.', rand),
      mcq(C, `1000 − 1 =`, '999', ['1001', '990', '900'], 'Predecessor.', rand),
      mcq(C, `500 − 250 =`, '250', ['200', '300', '750'], 'Half.', rand),
      mcq(L, `Difference even? ${a}−${b}`, d % 2 === 0 ? 'Yes' : 'No', [d % 2 === 0 ? 'No' : 'Yes', 'Always', 'Never'], 'Parity.', rand),
      mcq(A, `Forgot borrow of 1 ten → wrong by about:`, '10', ['1', '100', '0'], 'Ten.', rand),
      mcq(C, `Minuend is the:`, 'Number you start with', ['Number subtracted', 'Answer only', 'Carry'], 'Vocabulary.', rand),
      mcq(C, `${a} − ${a} =`, '0', [String(a), '1', String(b)], 'Same−same.', rand),
      mcq(A, `Closest difference to ${d}:`, String(d), [String(d + 50), String(a), String(b)], 'Exact.', rand),
      mcq(L, `Pattern: ${a}, ${a - 5}, ${a - 10}, ___`, String(a - 15), [String(a - 12), String(a + 5), String(d)], 'Subtract 5.', rand),
      mcq(C, `Check subtraction by:`, 'Adding difference + subtrahend', ['Multiplying', 'Ignoring', 'Rounding only'], 'Check.', rand),
      mcq(A, `${d} + ${b} =`, String(a), [String(d), String(b), '0'], 'Check sum.', rand),
    ]
  },

  pattern(rand) {
    const start = irand(rand, 2, 20)
    const step = pick(rand, [2, 3, 5, 10])
    const seq = [start, start + step, start + 2 * step, start + 3 * step]
    return [
      mcq(L, `Next: ${seq.slice(0, 3).join(', ')}, ___`, String(seq[3]), [String(seq[2] + 1), String(seq[0]), String(step)], `Add ${step}.`, rand),
      mcq(C, `Common difference is:`, String(step), [String(start), '1', '0'], 'Step size.', rand),
      mcq(L, `Odd one: ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[2] + step + 1}`, String(seq[2] + step + 1), seq.slice(0, 3).map(String), 'Breaks pattern.', rand),
      mcq(A, `5th term after ${seq[0]} with step ${step}:`, String(start + 4 * step), [String(start + 3 * step), String(step), String(start)], 'start+4×step.', rand),
      mcq(C, `Skip counting by 10 from 10: 10,20,30,___`, '40', ['35', '50', '31'], 'Add 10.', rand),
      mcq(C, `Even pattern often uses step:`, '2', ['3 only', '7 only', '9 only'], 'Evens.', rand),
      mcq(L, `Shape pattern ○□○□ next:`, '○', ['△', '☆', '■ only'], 'Alternating.', rand),
      mcq(A, `If rule is ×2: 3,6,12,___`, '24', ['14', '18', '20'], 'Double.', rand),
      mcq(C, `Growing pattern means terms:`, 'Increase', ['Always shrink', 'Stay same', 'Become letters'], 'Grow.', rand),
      mcq(A, `${seq[0]} + ${step}×3 =`, String(start + 3 * step), [String(start), String(step), String(seq[1])], 'Arithmetic.', rand),
      mcq(L, `Which continues 2,4,8,16?`, '32', ['18', '20', '24'], '×2.', rand),
      mcq(C, `1,3,5,7 are:`, 'Odd numbers', ['Even', 'Tens', 'Hundreds'], 'Odds.', rand),
      mcq(A, `Missing: 5,10,__,20`, '15', ['12', '18', '25'], 'Add 5.', rand),
      mcq(C, `Pattern rule should be:`, 'Consistent', ['Random', 'Secret always', 'Only colours'], 'Same rule.', rand),
      mcq(L, `Next square numbers after 1,4,9:`, '16', ['10', '12', '18'], '4²=16.', rand),
    ]
  },

  tables(rand) {
    const t = irand(rand, 2, 12)
    const n = irand(rand, 1, 10)
    const p = t * n
    return [
      mcq(C, `${t} × ${n} =`, String(p), [String(p + t), String(p - t), String(t + n)], 'Times table.', rand),
      mcq(C, `${t} × 0 =`, '0', [String(t), '1', String(n)], '×0.', rand),
      mcq(C, `${t} × 1 =`, String(t), ['1', '0', String(p)], '×1.', rand),
      mcq(L, `Next multiple of ${t} after ${p}:`, String(p + t), [String(p + 1), String(p - t), String(n)], 'Add one lot.', rand),
      mcq(A, `${p} ÷ ${t} =`, String(n), [String(t), String(p), '0'], 'Inverse.', rand),
      mcq(C, `Table of ${t}: ${t}, ${2 * t}, ${3 * t}, ___`, String(4 * t), [String(3 * t + 1), String(5 * t), String(t)], 'Next.', rand),
      mcq(C, `5 × 5 =`, '25', ['20', '30', '15'], '25.', rand),
      mcq(C, `10 × ${n} =`, String(10 * n), [String(n), String(10 + n), String(p)], 'Add zero.', rand),
      mcq(A, `How many ${t}s in ${p}?`, String(n), [String(t), String(p), '1'], 'Division meaning.', rand),
      mcq(L, `Odd product?`, `${t}×${n % 2 === 0 ? n + 1 : n}`, [`${t}×${n % 2 === 0 ? n : n + 1}`, '2×2', '10×4'].map(String), 'Odd×odd can be odd.', rand),
      mcq(C, `Commutative: ${t}×${n}=`, `${n}×${t}`, [`${t}+${n}`, `${t}−${n}`, `${p}+1`], 'Order free.', rand),
      mcq(A, `${t}×${n}+${t}=`, String(p + t), [String(p), String(t), String(n)], 'Next multiple.', rand),
      mcq(C, `9 × 9 =`, '81', ['72', '90', '99'], '81.', rand),
      mcq(L, `Pattern in 5s: 5,10,15,___`, '20', ['16', '25', '18'], 'Add 5.', rand),
      mcq(A, `Product ${p} is multiple of:`, String(t), [String(t + 7), 'Only 11', 'Only 13'], `${t} divides ${p}.`, rand),
    ]
  },

  mult(rand) {
    const a = irand(rand, 2, 12)
    const b = irand(rand, 2, 9)
    const p = a * b
    return [
      mcq(C, `${a} × ${b} =`, String(p), [String(p + a), String(a + b), String(p - 1)], 'Multiply.', rand),
      mcq(C, `Multiplication is repeated:`, 'Addition', ['Subtraction', 'Division only', 'Rounding'], 'Meaning.', rand),
      mcq(L, `${a} groups of ${b} =`, String(p), [String(a + b), String(b), String(a)], 'Array.', rand),
      mcq(A, `Factor of ${p}:`, String(a), [String(a + b + 3), String(p + 1), '0'], `${a}×${b}=${p}.`, rand),
      mcq(C, `${a} × 10 =`, String(a * 10), [String(a + 10), String(a), String(p)], '×10.', rand),
      mcq(C, `Product means:`, 'Answer of multiplication', ['Only sum', 'Only difference', 'A fraction bar'], 'Vocab.', rand),
      mcq(A, `If ${a}×□=${p}, □=`, String(b), [String(a), String(p), '1'], 'Missing factor.', rand),
      mcq(L, `Array 3 rows of 4:`, '12', ['7', '34', '1'], '3×4.', rand),
      mcq(C, `Any number × 0 =`, '0', ['1', 'Itself', '10'], 'Zero property.', rand),
      mcq(A, `${a}×${b}+${a}=`, String(p + a), [String(p), String(a + b), String(b)], 'Factor out.', rand),
      mcq(C, `6 × 7 =`, '42', ['36', '48', '40'], '42.', rand),
      mcq(L, `Double of ${a} is:`, String(a * 2), [String(a + 2), String(a), String(p)], '×2.', rand),
      mcq(C, `Multiple of ${a} near ${p}:`, String(p), [String(p + 1), String(a + b), '3'], 'Exact product.', rand),
      mcq(A, `Word: ${a} bags × ${b} sweets =`, String(p), [String(a + b), String(b), String(a)], 'Story mult.', rand),
      mcq(C, `Identity for × is:`, '1', ['0', '10', '2'], '×1.', rand),
    ]
  },

  div(rand) {
    const b = irand(rand, 2, 9)
    const q = irand(rand, 2, 9)
    const a = b * q
    const rem = irand(rand, 1, b - 1)
    return [
      mcq(C, `${a} ÷ ${b} =`, String(q), [String(b), String(a), String(q + 1)], 'Divide.', rand),
      mcq(C, `Division is sharing into:`, 'Equal groups', ['Random piles', 'Only adding', 'Only colours'], 'Meaning.', rand),
      mcq(L, `${a} sweets ÷ ${b} kids =`, String(q), [String(a + b), String(b), '0'], 'Fair share.', rand),
      mcq(A, `${a}+${rem} ÷ ${b} leaves remainder:`, String(rem), ['0', String(b), String(q)], 'Not exact.', rand),
      mcq(C, `${a} ÷ ${a} =`, '1', ['0', String(a), String(b)], 'Same÷same.', rand),
      mcq(C, `${a} ÷ 1 =`, String(a), ['1', '0', String(b)], '÷1.', rand),
      mcq(A, `Check: ${q} × ${b} =`, String(a), [String(q + b), String(b), '0'], 'Inverse.', rand),
      mcq(C, `Dividend is:`, 'Number being divided', ['Answer only', 'Remainder only', 'Zero'], 'Vocab.', rand),
      mcq(L, `12 ÷ 3 =`, '4', ['3', '6', '9'], '4.', rand),
      mcq(C, `If remainder, it must be:`, `< divisor`, ['≥ divisor', 'Negative', 'Always 9'], 'Rule.', rand),
      mcq(A, `${a} ÷ ${b} × ${b} =`, String(a), [String(q), String(b), '1'], 'Undo.', rand),
      mcq(C, `20 ÷ 5 =`, '4', ['5', '15', '25'], '4.', rand),
      mcq(L, `Half of ${a} (if even):`, a % 2 === 0 ? String(a / 2) : String(q), [String(a), String(b), '0'], '÷2 if even.', rand),
      mcq(A, `Groups of ${b} in ${a}:`, String(q), [String(a), String(b + q), '1'], 'Grouping.', rand),
      mcq(C, `Quotient means:`, 'Division answer', ['Only sum', 'Only product', 'A shape'], 'Vocab.', rand),
    ]
  },

  frac(rand) {
    const d = pick(rand, [2, 3, 4, 5, 8])
    const n = irand(rand, 1, d - 1)
    return [
      mcq(C, `In ${n}/${d}, ${n} is the:`, 'Numerator', ['Denominator', 'Sum', 'Product'], 'Top.', rand),
      mcq(C, `In ${n}/${d}, ${d} is the:`, 'Denominator', ['Numerator', 'Remainder', 'Factor'], 'Bottom.', rand),
      mcq(C, `1/2 of 12 =`, '6', ['4', '8', '3'], 'Half.', rand),
      mcq(C, `1/4 of 8 =`, '2', ['4', '1', '8'], 'Quarter.', rand),
      mcq(L, `Which is larger: 1/2 or 1/4?`, '1/2', ['1/4', 'Equal', '1/8'], 'Same whole.', rand),
      mcq(C, `3/4 means:`, '3 parts out of 4 equal parts', ['4 out of 3', 'Only 3', 'Only 4'], 'Meaning.', rand),
      mcq(A, `Equivalent to 1/2:`, '2/4', ['1/3', '3/5', '2/2'], 'Double both.', rand),
      mcq(C, `Fraction of shaded half-circle:`, '1/2', ['1/3', '2/2', '0'], 'Half.', rand),
      mcq(L, `Odd one: 1/2, 2/4, 3/6, 1/3`, '1/3', ['1/2', '2/4', '3/6'], 'Not half.', rand),
      mcq(A, `${n}/${d} of ${d} =`, String(n), [String(d), String(n + d), '0'], 'Cancel.', rand),
      mcq(C, `Unit fraction has numerator:`, '1', ['0', '2', '10'], '1/n.', rand),
      mcq(C, `Whole as fraction:`, `${d}/${d}`, [`${n}/${d}`, '0/1', '2/1'], 'Same/same.', rand),
      mcq(A, `1/2 + 1/2 =`, '1', ['1/4', '2/2 only as words', '0'], 'One whole.', rand),
      mcq(L, `Pizza cut into ${d}, eat ${n}: fraction eaten:`, `${n}/${d}`, [`${d}/${n}`, '1', '0'], 'Parts eaten.', rand),
      mcq(C, `Fractions need equal:`, 'Parts', ['Colours only', 'Sizes random', 'Only odds'], 'Equal shares.', rand),
    ]
  },

  time(rand) {
    const h = irand(rand, 1, 11)
    const m = pick(rand, [0, 15, 30, 45])
    const later = (m + 30) % 60
    const h2 = m + 30 >= 60 ? h + 1 : h
    return [
      mcq(C, `1 hour = ___ minutes`, '60', ['30', '100', '24'], '60.', rand),
      mcq(C, `Half hour =`, '30 minutes', ['15 minutes', '45 minutes', '60 minutes'], '30.', rand),
      mcq(C, `Quarter past ${h} =`, `${h}:15`, [`${h}:30`, `${h}:45`, `${h}:00`], '15 past.', rand),
      mcq(C, `Half past ${h} =`, `${h}:30`, [`${h}:15`, `${h}:45`, `${h}:00`], '30.', rand),
      mcq(C, `Quarter to ${h + 1} =`, `${h}:45`, [`${h}:15`, `${h}:30`, `${h + 1}:15`], '45.', rand),
      mcq(L, `From ${h}:${String(m).padStart(2, '0')} after 30 min:`, `${h2}:${String(later).padStart(2, '0')}`, [`${h}:00`, `${h}:60`, `${h + 2}:00`], 'Add 30.', rand),
      mcq(C, `a.m. means:`, 'Before noon', ['After noon', 'Midnight only', 'Only sports'], 'Morning.', rand),
      mcq(C, `p.m. means:`, 'After noon', ['Before noon', 'Only night', 'Only exams'], 'Afternoon/evening.', rand),
      mcq(A, `Minutes from ${h}:00 to ${h}:45:`, '45', ['15', '30', '60'], '45.', rand),
      mcq(C, `Days in a week:`, '7', ['5', '10', '12'], '7.', rand),
      mcq(C, `Months in a year:`, '12', ['10', '7', '24'], '12.', rand),
      mcq(A, `2 hours = ___ minutes`, '120', ['60', '90', '100'], '2×60.', rand),
      mcq(L, `Clock hands: short hand shows:`, 'Hours', ['Minutes only', 'Seconds only', 'Days'], 'Hour hand.', rand),
      mcq(C, `Long hand shows:`, 'Minutes', ['Hours only', 'Months', 'Years'], 'Minute hand.', rand),
      mcq(A, `15 minutes is ___ of an hour`, '1/4', ['1/2', '1/3', '1/5'], '15/60.', rand),
    ]
  },

  money(rand) {
    const r = irand(rand, 5, 90)
    const p = pick(rand, [25, 50, 75])
    return [
      mcq(C, `100 paise =`, '1 rupee', ['10 rupees', '50 paise', '0'], 'Conversion.', rand),
      mcq(C, `₹${r} + ₹10 =`, `₹${r + 10}`, [`₹${r}`, `₹${r - 10}`, '₹0'], 'Add money.', rand),
      mcq(C, `₹${r} − ₹5 =`, `₹${r - 5}`, [`₹${r + 5}`, `₹${r}`, '₹1'], 'Subtract.', rand),
      mcq(L, `Cost ₹${r}, pay ₹${r + 20}, change:`, `₹20`, [`₹${r}`, '₹10', '₹0'], 'Change.', rand),
      mcq(A, `₹${r} + ${p} paise is about:`, `a bit more than ₹${r}`, [`₹${r + 100}`, '₹0', `₹${p}`], 'Paise part.', rand),
      mcq(C, `50 paise = ___ of a rupee`, '1/2', ['1/4', '1/10', '2'], 'Half.', rand),
      mcq(C, `25 paise = ___ of a rupee`, '1/4', ['1/2', '1', '3/4'], 'Quarter.', rand),
      mcq(A, `3 notes of ₹10 =`, '₹30', ['₹3', '₹13', '₹100'], '3×10.', rand),
      mcq(L, `Cheaper item: ₹${r} vs ₹${r + 5}`, `₹${r}`, [`₹${r + 5}`, 'Same', '₹0'], 'Compare.', rand),
      mcq(C, `Symbol for rupee often:`, '₹', ['$', '€', '£ only'], 'INR.', rand),
      mcq(A, `Buy 2 toys at ₹${Math.floor(r / 2) || 5} each ≈`, `about ₹${2 * (Math.floor(r / 2) || 5)}`, ['₹1', `₹${r * 10}`, '₹0'], '2×price.', rand),
      mcq(C, `₹100 − ₹${r} =`, `₹${100 - r}`, [`₹${r}`, '₹100', '₹0'], 'Subtract from 100.', rand),
      mcq(L, `Odd one (not money): ₹, paise, metre`, 'metre', ['₹', 'paise', 'rupee'], 'Length unit.', rand),
      mcq(C, `Making change needs:`, 'Subtraction', ['Only multiplication of shapes', 'Roman only', 'Area only'], 'Skill.', rand),
      mcq(A, `Total ₹${r} + ₹${r} =`, `₹${2 * r}`, [`₹${r}`, `₹${r + 1}`, '₹10'], 'Double.', rand),
    ]
  },

  measure(rand) {
    const cm = irand(rand, 10, 90)
    return [
      mcq(C, `100 cm =`, '1 m', ['10 m', '1 km', '100 m'], 'Conversion.', rand),
      mcq(C, `1000 g =`, '1 kg', ['10 kg', '100 kg', '1 g'], 'Mass.', rand),
      mcq(C, `1000 ml =`, '1 litre', ['10 litres', '1 ml', '100 litres'], 'Capacity.', rand),
      mcq(C, `Length of pencil often measured in:`, 'cm', ['km', 'kg', 'litres'], 'cm.', rand),
      mcq(C, `Body weight often in:`, 'kg', ['cm', 'ml', 'paise'], 'kg.', rand),
      mcq(C, `Milk often in:`, 'litres / ml', ['km', 'kg only', '°C only'], 'Capacity.', rand),
      mcq(L, `${cm} cm + 10 cm =`, `${cm + 10} cm`, [`${cm} cm`, `${cm - 10} cm`, '1 m'], 'Add length.', rand),
      mcq(A, `${cm} cm is ___ m and ___ cm`, `${Math.floor(cm / 100)} m ${cm % 100} cm`, ['1 m 0 cm', '0 m 0 cm', '10 m'], 'Split.', rand),
      mcq(C, `Longer unit for road distance:`, 'km', ['cm', 'mm', 'ml'], 'km.', rand),
      mcq(A, `2 m = ___ cm`, '200', ['20', '2', '2000'], '×100.', rand),
      mcq(C, `Heavier: 1 kg or 500 g?`, '1 kg', ['500 g', 'Equal', 'Cannot say'], '1000>500.', rand),
      mcq(L, `Odd one: cm, m, kg`, 'kg', ['cm', 'm', 'mm'], 'Mass vs length.', rand),
      mcq(C, `Ruler helps measure:`, 'Length', ['Time only', 'Money only', 'Taste'], 'Tool.', rand),
      mcq(A, `Half litre =`, '500 ml', ['100 ml', '1000 ml', '50 ml'], 'Half of 1000.', rand),
      mcq(C, `Choose sensible unit for classroom length:`, 'm / cm', ['km only', 'tonnes', 'years'], 'Sense.', rand),
    ]
  },

  geo(rand) {
    return [
      mcq(C, `A triangle has ___ sides`, '3', ['4', '5', '2'], 'Tri.', rand),
      mcq(C, `A square has ___ equal sides`, '4', ['3', '5', '2'], 'Square.', rand),
      mcq(C, `A rectangle has ___ right angles`, '4', ['1', '2', '0'], 'Rectangle.', rand),
      mcq(C, `A circle has ___ sides`, '0 (curved)', ['3', '4', '5'], 'No straight sides.', rand),
      mcq(C, `Cube is a ___ shape`, '3D', ['2D', 'Line', 'Number'], 'Solid.', rand),
      mcq(L, `Odd one: square, triangle, circle, cube`, 'cube', ['square', 'triangle', 'circle'], '3D among 2D.', rand),
      mcq(C, `A point has:`, 'No length/breadth', ['4 sides', 'Volume only', 'Weight'], 'Point.', rand),
      mcq(C, `A line segment has:`, 'Two endpoints', ['No ends', 'Three ends', 'Only curves'], 'Segment.', rand),
      mcq(A, `Faces on a cube:`, '6', ['4', '8', '12'], '6 faces.', rand),
      mcq(A, `Edges on a cube:`, '12', ['6', '8', '4'], '12 edges.', rand),
      mcq(C, `Vertices on a cube:`, '8', ['6', '4', '12'], '8 corners.', rand),
      mcq(L, `Symmetry means:`, 'Mirror halves match', ['Always odd sides', 'Only colours', 'Only 3D'], 'Idea.', rand),
      mcq(C, `Right angle measures:`, '90°', ['45°', '180°', '0°'], 'Corner of square.', rand),
      mcq(A, `Pentagon sides:`, '5', ['4', '6', '8'], 'Penta=5.', rand),
      mcq(C, `Sphere example:`, 'Ball', ['Book', 'Dice edge only', 'Ruler'], 'Sphere.', rand),
    ]
  },

  area(rand) {
    const l = irand(rand, 3, 12)
    const w = irand(rand, 2, 8)
    return [
      mcq(C, `Perimeter of rectangle ${l} by ${w}:`, String(2 * (l + w)), [String(l * w), String(l + w), String(l)], '2(l+w).', rand),
      mcq(C, `Area of rectangle ${l} by ${w}:`, String(l * w), [String(2 * (l + w)), String(l + w), String(l)], 'l×w.', rand),
      mcq(C, `Perimeter is distance:`, 'Around', ['Inside only', 'Diagonal only', 'Through centre only'], 'Around.', rand),
      mcq(C, `Area is space:`, 'Inside', ['Only around', 'Only height', 'Only colour'], 'Inside.', rand),
      mcq(L, `Unit of area often:`, 'square cm / square m', ['Only litres', 'Only kg', 'Only minutes'], 'Square units.', rand),
      mcq(A, `Square side ${l}, perimeter:`, String(4 * l), [String(l * l), String(2 * l), String(l)], '4×side.', rand),
      mcq(A, `Square side ${l}, area:`, String(l * l), [String(4 * l), String(2 * l), String(l)], 'side².', rand),
      mcq(C, `If only length doubles, area:`, 'Doubles', ['Same', 'Halves', 'Squares always'], 'l×w.', rand),
      mcq(L, `Fence length relates to:`, 'Perimeter', ['Area only', 'Volume only', 'Weight'], 'Around.', rand),
      mcq(C, `Floor covering relates to:`, 'Area', ['Perimeter only', 'Time only', 'Money only'], 'Inside.', rand),
      mcq(A, `Perimeter of ${l}×${w} vs area number:`, 'Different meanings', ['Always equal', 'Always area larger by 1', 'Always same unit'], 'Compare ideas.', rand),
      mcq(C, `Polygon perimeter:`, 'Sum of all sides', ['Product of sides', 'Only longest side', 'Diagonal'], 'Sum.', rand),
      mcq(L, `Odd one: perimeter, area, kilogram`, 'kilogram', ['perimeter', 'area', 'square cm'], 'Mass.', rand),
      mcq(A, `Rectangle 5×4 area:`, '20', ['18', '9', '14'], '20.', rand),
      mcq(C, `Closed shape needed for:`, 'Area', ['Only open rays', 'Only points', 'Only clocks'], 'Region.', rand),
    ]
  },

  data(rand) {
    const a = irand(rand, 2, 9)
    const b = irand(rand, 2, 9)
    const c = irand(rand, 2, 9)
    return [
      mcq(C, `Pictograph uses:`, 'Pictures/symbols', ['Only roman', 'Only clocks', 'Only kg'], 'Pics.', rand),
      mcq(C, `Bar graph uses:`, 'Bars', ['Only circles forever', 'Only smells', 'Only music'], 'Bars.', rand),
      mcq(L, `If ★=2 pupils and 3★ shown:`, '6 pupils', ['3', '2', '5'], '3×2.', rand),
      mcq(C, `Tally mark bundle of 5 looks like:`, '|||| with a slash', ['Only one |', 'A circle', 'A triangle'], 'Tally.', rand),
      mcq(A, `Votes A=${a}, B=${b}, C=${c}. Highest:`, String(Math.max(a, b, c)), [String(Math.min(a, b, c)), '0', '100'], 'Compare.', rand),
      mcq(A, `Total votes A+B+C:`, String(a + b + c), [String(a * b), String(a), String(c)], 'Sum.', rand),
      mcq(C, `Title of a graph helps you:`, 'Know what data shows', ['Hide numbers', 'Change units secretly', 'Delete bars'], 'Title.', rand),
      mcq(L, `Scale ★=5, 4★ =`, '20', ['4', '5', '9'], '4×5.', rand),
      mcq(C, `Tables organise data in:`, 'Rows and columns', ['Only colours', 'Only songs', 'Only shapes'], 'Grid.', rand),
      mcq(A, `Difference max−min of ${a},${b},${c}:`, String(Math.max(a, b, c) - Math.min(a, b, c)), ['0', String(a + b), String(c)], 'Range idea.', rand),
      mcq(C, `Reading a graph carefully needs:`, 'Key/scale', ['Ignoring labels', 'Guessing only', 'Closing eyes'], 'Key.', rand),
      mcq(L, `Odd one: pictograph, bar graph, subtraction borrow rule`, 'subtraction borrow rule', ['pictograph', 'bar graph', 'tally'], 'Not a chart.', rand),
      mcq(C, `Most favourite from bars =`, 'Tallest bar', ['Shortest always', 'Middle always', 'Random'], 'Height.', rand),
      mcq(A, `If each bar +1, totals:`, 'Increase', ['Stay same', 'Halve', 'Become zero'], 'Shift.', rand),
      mcq(C, `Data means:`, 'Information collected', ['Only toys', 'Only weather forever', 'Only money'], 'Info.', rand),
    ]
  },

  word(rand) {
    const a = irand(rand, 20, 80)
    const b = irand(rand, 5, 20)
    const t = irand(rand, 2, 9)
    return [
      mcq(L, `Riya has ${a} stickers, gets ${b} more. Total:`, String(a + b), [String(a - b), String(a), String(b)], 'Add.', rand),
      mcq(L, `Sam has ${a}, gives ${b} away. Left:`, String(a - b), [String(a + b), String(a), String(b)], 'Subtract.', rand),
      mcq(C, `${t} boxes × ${b} pencils =`, String(t * b), [String(t + b), String(b), String(t)], 'Multiply.', rand),
      mcq(C, `${t * b} shared among ${t} =`, String(b), [String(t), String(t * b), '0'], 'Divide.', rand),
      mcq(A, `Buy ${t} items at ₹${b}: cost`, `₹${t * b}`, [`₹${t + b}`, `₹${b}`, '₹1'], 'Mult money.', rand),
      mcq(A, `After spending ₹${b} from ₹${a}:`, `₹${a - b}`, [`₹${a + b}`, `₹${a}`, '₹0'], 'Subtract.', rand),
      mcq(L, `Need ${a}, have ${b}. Still need:`, String(a - b > 0 ? a - b : b), [String(a + b), String(a), '0'], 'Difference.', rand),
      mcq(C, `Keyword “altogether” often means:`, 'Add', ['Only divide', 'Only area', 'Ignore'], 'Clue.', rand),
      mcq(C, `Keyword “left” often means:`, 'Subtract', ['Only multiply', 'Only graph', 'Roman'], 'Clue.', rand),
      mcq(A, `2-step: ${a}+${b} then −${t}:`, String(a + b - t), [String(a + b + t), String(a), String(t)], 'Two steps.', rand),
      mcq(L, `Odd clue for joining amounts:`, 'Perimeter of a cube face list', ['altogether', 'in all', 'total'], 'Not joining money.', rand),
      mcq(C, `Check a story sum by:`, 'Rereading & estimating', ['Skipping numbers', 'Closing book', 'Guessing stars only'], 'Check.', rand),
      mcq(A, `Teams of ${t} from ${t * b} kids:`, String(b), [String(t), String(t * b), '1'], '÷.', rand),
      mcq(C, `Draw a picture for word problems to:`, 'Understand', ['Waste time only', 'Avoid reading', 'Hide answer'], 'Strategy.', rand),
      mcq(A, `Multi-step needs:`, 'More than one operation', ['Only one digit always', 'No reading', 'Only shapes'], 'Plan.', rand),
    ]
  },

  mixed(rand, day) {
    return [
      ...MATHS.word(rand).slice(0, 5),
      ...MATHS.add(rand).slice(0, 3),
      ...MATHS.frac(rand).slice(0, 3),
      ...MATHS.time(rand).slice(0, 2),
      mcq(A, `Grand review day ${day}: 7×8=`, '56', ['54', '63', '48'], '56.', rand),
      mcq(A, `Grand review: 1/2 of 18=`, '9', ['8', '6', '12'], '9.', rand),
    ].slice(0, 15)
  },
}

const SCIENCE_FACTS = {
  living: [
    ['Living things', 'grow and need food', 'never change', 'are always metal', 'cannot reproduce'],
    ['Non-living example', 'chair', 'puppy', 'mango tree', 'goldfish'],
    ['A seed can', 'grow into a plant', 'eat pizza', 'write books', 'fly like a jet always'],
    ['Living things need', 'air, water, food', 'only plastic', 'only stones', 'no energy ever'],
    ['Plants are living because they', 'grow and make food', 'are green only', 'never need water', 'are toys'],
  ],
  plants: [
    ['Roots mainly', 'absorb water and hold plant', 'make music', 'chase insects always', 'glow at night only'],
    ['Leaves help in', 'making food', 'digging soil only', 'only flowering colour', 'counting animals'],
    ['Photosynthesis needs', 'sunlight', 'darkness only', 'plastic bags', 'metal spoons'],
    ['Seeds grow by', 'germination', 'melting', 'evaporating into stars', 'turning into rocks'],
    ['Flowers often help in', 'reproduction / pollination', 'only measuring length', 'only telling time', 'only magnetism'],
  ],
  animals: [
    ['Herbivores eat', 'plants', 'only metal', 'only plastic', 'only stones'],
    ['Carnivores eat', 'other animals', 'only leaves forever', 'only water vapour', 'only sand'],
    ['Omnivores eat', 'plants and animals', 'only one food forever', 'only air', 'only ice'],
    ['Birds have', 'beaks and feathers', 'gills like fish always', 'scales only like snakes always', 'no wings ever'],
    ['Insects usually have', 'six legs', 'two legs', 'eight legs always', 'no legs ever'],
  ],
  habitat: [
    ['Habitat means', 'home of a living thing', 'a maths table', 'a clock hand', 'a fraction bar'],
    ['Fish habitat', 'water', 'desert sand only', 'clouds only', 'kitchen drawers'],
    ['Food chain starts with', 'plants / producers', 'only cars', 'only plastic', 'only books'],
    ['Desert animals often', 'save water', 'live underwater only', 'need snow always', 'eat metal'],
    ['Forests give', 'homes and oxygen help', 'only noise', 'only plastic toys', 'only traffic'],
  ],
  body: [
    ['We have ___ sense organs', '5', '2', '10', '20'],
    ['Heart', 'pumps blood', 'digests food', 'sees light', 'hears sound'],
    ['Lungs help us', 'breathe', 'taste sweets', 'grow hair only', 'make bones instantly'],
    ['Bones', 'support and protect', 'pump blood only', 'taste food', 'make rain'],
    ['Eyes help us', 'see', 'hear', 'smell only', 'pump blood'],
  ],
  health: [
    ['Washing hands is', 'hygiene', 'geometry', 'place value', 'pictographs only'],
    ['Balanced diet includes', 'varied healthy foods', 'only sweets', 'only chips', 'only soda'],
    ['Sleep helps the body', 'rest and recover', 'skip growing', 'avoid water forever', 'stop learning'],
    ['Exercise keeps us', 'fit and strong', 'sleepy forever', 'unable to play', 'afraid of parks'],
    ['Medicines should be taken', 'with adult help', 'as candy anytime', 'in the dark secretly', 'without labels ever'],
  ],
  matter: [
    ['Three states of matter', 'solid, liquid, gas', 'hot, cold, warm only', 'red, blue, green', 'odd, even, prime'],
    ['Solids have', 'fixed shape', 'no shape ever', 'only smell', 'only sound'],
    ['Liquids', 'take shape of container', 'have fixed shape like cubes always', 'cannot flow', 'are always metal'],
    ['Gas', 'spreads to fill space', 'has fixed shape like a brick', 'cannot move', 'is always visible colour'],
    ['Ice melting is', 'change of state', 'a living growth', 'a habitat', 'a food chain'],
  ],
  water: [
    ['Water cycle includes', 'evaporation and rain', 'only multiplication', 'only roman numerals', 'only magnets'],
    ['We should', 'save water', 'waste water always', 'pollute rivers', 'block drains with plastic proudly'],
    ['Drinking water should be', 'clean', 'dirty', 'salty seawater only', 'oil'],
    ['Clouds form from', 'water vapour', 'rocks only', 'plastic only', 'metal only'],
    ['Rain helps', 'plants and refill water', 'only erase habitats', 'only melt metals in school bags', 'only stop seasons'],
  ],
  earth: [
    ['Earth has', 'land and water', 'only candy', 'only classrooms', 'no air'],
    ['Soil helps', 'plants grow', 'only tell time', 'only store paise', 'only draw circles'],
    ['Rocks are', 'natural materials', 'living animals', 'fractions', 'clocks'],
    ['Weather can be', 'sunny, rainy, windy', 'only square', 'only odd', 'only roman'],
    ['Seasons change because of', 'Earth’s path/tilt (simple idea)', 'only homework', 'only money', 'only pictographs'],
  ],
  space: [
    ['Sun gives', 'light and heat', 'only ice', 'only soil', 'only plastic'],
    ['Earth goes around the', 'Sun', 'Moon only as centre forever', 'a classroom chair', 'a fraction'],
    ['Moon', 'orbits Earth', 'is a habitat fish tank', 'makes tables', 'is a solid liquid gas exam only'],
    ['Stars are', 'huge distant suns', 'tiny insects', 'classroom bells', 'rupee coins'],
    ['Day and night happen because Earth', 'rotates', 'stops moving forever', 'becomes square', 'melts'],
  ],
  env: [
    ['Reduce means', 'use less', 'throw more', 'buy only plastic', 'waste water'],
    ['Reuse means', 'use again', 'burn always', 'bury toys in food', 'ignore recycling'],
    ['Recycle means', 'make new from old', 'litter more', 'pollute air proudly', 'waste electricity'],
    ['Pollution harms', 'living things', 'only numbers', 'only clocks', 'only roman numerals'],
    ['Planting trees', 'helps the environment', 'always causes floods only', 'removes all oxygen instantly', 'stops rain forever'],
  ],
  force: [
    ['A push or pull is a', 'force', 'fraction', 'habitat', 'roman numeral'],
    ['Magnets attract', 'iron/steel', 'wood always', 'plastic always', 'paper always'],
    ['Light helps us', 'see', 'hear better only', 'taste salt', 'grow money'],
    ['Sound is made by', 'vibrations', 'only silence', 'only colours', 'only soil'],
    ['Energy from the Sun is', 'solar energy', 'only homework energy', 'only plastic energy', 'only tally energy'],
  ],
  mixed: [
    ['Science studies', 'the world around us', 'only movie stars', 'only shopping', 'only fonts'],
    ['A fair test needs', 'careful observation', 'guessing only', 'hiding results', 'skipping tools'],
    ['Safety in experiments means', 'adult help & care', 'mixing unknown chemicals alone', 'tasting unknowns', 'running with glass'],
    ['Bangalore parks show', 'plants and birds', 'only desert dunes', 'only ocean whales in classrooms', 'only glaciers indoors'],
    ['Best scientist habit', 'ask & observe', 'never wonder', 'never record', 'never share ideas'],
  ],
}

function scienceQuiz(family, rand, topic) {
  const facts = SCIENCE_FACTS[family] || SCIENCE_FACTS.mixed
  const qs = []
  for (let i = 0; i < 15; i++) {
    const row = facts[i % facts.length]
    const level = i < 4 ? L : i < 11 ? C : A
    const [promptBase, correct, ...wrongs] = row
    const prompt =
      i % 5 === 0
        ? `Topic “${topic}”: ${promptBase}?`
        : i % 3 === 0
          ? `Odd idea check — ${promptBase}:`
          : `${promptBase}:`
    qs.push(mcq(level, prompt, correct, wrongs, 'From today’s science topic.', rand))
  }
  // diversify with a few fixed classics
  qs[2] = mcq(L, `Living vs non-living: which is living?`, 'Tree', ['Rock', 'Pencil', 'Chair'], 'Trees grow.', rand)
  qs[7] = mcq(C, `We should protect`, 'nature and living things', ['only litter', 'only pollution', 'only waste'], 'Care.', rand)
  qs[12] = mcq(A, `Best study habit for science`, 'Observe and ask why', ['Memorise without looking', 'Skip experiments safely planned', 'Ignore safety'], 'Curiosity.', rand)
  return qs
}

export function generateQuiz(day, subject, family, topic) {
  const seed = day * 1009 + (subject === 'maths' ? 17 : 91) + (family || '').length * 13
  const rand = mulberry32(seed)
  if (subject === 'maths') {
    const gen = MATHS[family] || MATHS.mixed
    const qs = gen(rand, day)
    return qs.slice(0, 15)
  }
  return scienceQuiz(family, rand, topic).slice(0, 15)
}
