import { useState, useEffect } from 'react';
import { CourseService } from '../services/courseService';
import { topicsData } from '../data/mockData'; // Fallback data

/**
 * Custom hook for managing courses data
 * Falls back to mock data if Supabase is not available
 */
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSupabaseEnabled = import.meta.env.VITE_ENABLE_SUPABASE === 'true';

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError(null);

      if (isSupabaseEnabled) {
        try {
          const { data, error } = await CourseService.getAllCourses();
          
          if (error) {
            console.warn('Supabase error, falling back to mock data:', error);
            setCourses(topicsData);
          } else if (data && data.length > 0) {
            // Transform Supabase data to match existing format
            const transformedCourses = data.map(course => ({
              id: course.id,
              category: course.category,
              title: course.title,
              description: course.description,
              lessons: course.total_lessons,
              hours: course.estimated_hours,
              rating: course.rating,
              icon: course.icon
            }));
            setCourses(transformedCourses);
          } else {
            // No courses in database, use mock data
            setCourses(topicsData);
          }
        } catch (err) {
          console.warn('Failed to load courses from Supabase, using mock data:', err);
          setCourses(topicsData);
          setError(err);
        }
      } else {
        // Supabase disabled, use mock data
        setCourses(topicsData);
      }

      setLoading(false);
    };

    loadCourses();
  }, [isSupabaseEnabled]);

  const getCoursesByCategory = (category) => {
    if (category === 'all') return courses;
    return courses.filter(course => course.category === category);
  };

  const searchCourses = (searchTerm) => {
    if (!searchTerm) return courses;
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const refreshCourses = async () => {
    setLoading(true);
    if (isSupabaseEnabled) {
      try {
        const { data, error } = await CourseService.getAllCourses();
        if (!error && data) {
          const transformedCourses = data.map(course => ({
            id: course.id,
            category: course.category,
            title: course.title,
            description: course.description,
            lessons: course.total_lessons,
            hours: course.estimated_hours,
            rating: course.rating,
            icon: course.icon
          }));
          setCourses(transformedCourses);
        }
      } catch (err) {
        setError(err);
      }
    }
    setLoading(false);
  };

  return {
    courses,
    loading,
    error,
    isSupabaseEnabled,
    getCoursesByCategory,
    searchCourses,
    refreshCourses
  };
};