import { expect } from 'jsr:@std/expect'
import { atom } from './mod.ts'

// Test 1: Ensure that atom can hold and return the correct initial value
Deno.test('atom should hold and return the initial value', () => {
  const countAtom = atom(10)
  expect(countAtom.get()).toBe(10)
})

// Test 2: Ensure that atom's value can be updated directly
Deno.test('atom should allow updating the value directly', () => {
  const countAtom = atom(10)
  countAtom.set(20)
  expect(countAtom.get()).toBe(20)
})

// Test 3: Ensure that atom's value can be updated using a function
Deno.test('atom should allow updating the value via a function', () => {
  const countAtom = atom(10)
  countAtom.set((prev) => prev + 5)
  expect(countAtom.get()).toBe(15)
})
