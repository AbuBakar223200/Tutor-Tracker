import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tutor_tracker_data';
const MASTER_PASSWORD = import.meta.env.VITE_MASTER_PASSWORD || 'admin123';
const DEFAULT_SALARY = 80000;
const DEFAULT_CYCLE_DAYS = 16;

export const useTutorData = () => {
  const [days, setDays] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isMasterUnlock, setIsMasterUnlock] = useState(false);
  
  const [salary, setSalary] = useState(DEFAULT_SALARY);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setDays(parsed.days || generateCurrentMonth());
        setSalary(parsed.salary || DEFAULT_SALARY);
        // Recalculate default rate if not set, based on new 16-day rule
        if (parsed.rate) {
            setRate(parsed.rate);
        } else {
            const sal = parsed.salary || DEFAULT_SALARY;
            setRate(sal / DEFAULT_CYCLE_DAYS);
        }
      } else {
        setDays(generateCurrentMonth());
        setSalary(DEFAULT_SALARY);
        setRate(DEFAULT_SALARY / DEFAULT_CYCLE_DAYS); // 80000 / 16 = 5000
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (days.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ days, rate, salary }));
    }
  }, [days, rate, salary]);

  const generateCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(year, month, i + 1).toISOString().split('T')[0],
      isTaught: false,
      topic: ''
    }));
  };

  const toggleDay = (dateStr) => {
    setDays(prev => prev.map(day => {
      if (day.date === dateStr) {
        return { ...day, isTaught: !day.isTaught };
      }
      return day;
    }));
  };

  const updateTopic = (dateStr, newTopic) => {
    setDays(prev => prev.map(day => {
      if (day.date === dateStr) {
        return { ...day, topic: newTopic };
      }
      return day;
    }));
  };

  const attemptMasterUnlock = (inputPassword) => {
    if (inputPassword === MASTER_PASSWORD) {
      setIsMasterUnlock(true);
      return true;
    }
    return false;
  };

  const lockMaster = () => setIsMasterUnlock(false);

  const resetCycle = () => {
    if (confirm("Are you sure you want to reset the cycle? This will clear all 'Taught' marks.")) {
        setDays(prev => prev.map(day => ({ ...day, isTaught: false, topic: '' })));
    }
  };

  const totalDays = days.filter(d => d.isTaught).length;
  const earnings = totalDays * rate;

  return {
    days,
    isAdmin,
    setIsAdmin,
    isMasterUnlock,
    attemptMasterUnlock,
    lockMaster,
    toggleDay,
    updateTopic,
    resetCycle,
    totalDays,
    earnings,
    rate,
    setRate,
    salary, 
    setSalary
  };
};
