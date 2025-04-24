
"use client";

import { Card } from "@/components/ui/card";

const SocialHistory = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Social History</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-gray-600">Living Situation</h4>
          <p>Lives with family</p>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600">Occupation</h4>
          <p>Software Engineer</p>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600">Education</h4>
          <p>Bachelor's Degree</p>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600">Lifestyle</h4>
          <ul className="list-disc list-inside">
            <li>Non-smoker</li>
            <li>Occasional alcohol use</li>
            <li>Regular exercise</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default SocialHistory;
