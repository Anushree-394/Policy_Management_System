import { useDispatch, useSelector } from 'react-redux';

/**
 * Typed Redux Hooks
 * Provides type-safe hooks for Redux store access
 */

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

