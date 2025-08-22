import {  } from 'lucide-react';
 

import { MotionHighlight } from '@/components/animate-ui/effects/motion-highlight';
import { CARDS } from './cards';
 



 
export const OurMission = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-16 py-11">
      <MotionHighlight hover className="rounded-xl bg-primary group">
        {CARDS.map((card) => (
          <div key={card.value} data-value={card.value}>
            <div className="p-4 flex flex-col border rounded-xl space-y-5 group  transition ease-in duration-150">
              <div className="flex items-center justify-around size-10 rounded-lg bg-blue-500/10 mb-2">
                <card.icon className="size-5 text-primary group-hover:text-white transition ease-in duration-200" />
              </div>
              <p className="text-base font-medium mb-1">{card.title}</p>
              <p className="text-sm text-muted-foreground group group-hover:text-white transition ease-in duration-200">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </MotionHighlight>
    </div>
  );
};