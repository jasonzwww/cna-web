
import { UserProfile } from '../types';

export const iracingService = {
  // Simulates iRacing API authentication and data fetching
  async login(email: string): Promise<UserProfile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, we generate realistic data based on the email/name
    const name = email.split('@')[0].replace('.', ' ');
    const custId = Math.floor(100000 + Math.random() * 900000);

    return {
      cust_id: custId,
      display_name: name.charAt(0).toUpperCase() + name.slice(1),
      last_sync: new Date().toISOString(),
      cna_points: Math.floor(Math.random() * 500),
      joined_race_ids: ['gt3-r1', 'gt3-r2'], // Sample joined races
      location: {
        lat: 39.9042,
        lng: 116.4074,
        city: 'Beijing',
        country: 'China'
      },
      licenses: {
        sports_car: {
          category: "Sports Car",
          irating: Math.floor(1500 + Math.random() * 3500),
          safety_rating: (Math.random() * 4.99).toFixed(2),
          license_level: "B",
          color: "#eb1923"
        },
        formula: {
          category: "Formula",
          irating: Math.floor(1200 + Math.random() * 4000),
          safety_rating: (Math.random() * 4.99).toFixed(2),
          license_level: "A",
          color: "#3066eb"
        }
      }
    };
  }
};
