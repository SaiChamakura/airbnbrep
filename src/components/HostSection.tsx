import React, { useState } from 'react';
import { Award, Star, ShieldCheck, MessageSquare, X, Check } from 'lucide-react';
import { Host } from '../types';

interface HostSectionProps {
  host: Host;
}

export const HostSection: React.FC<HostSectionProps> = ({ host }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsMessageSent(true);
    setTimeout(() => {
      setIsMessageSent(false);
      setMessage('');
      setIsContactModalOpen(false);
    }, 1800);
  };

  return (
    <section id="host-section" className="py-8 border-b border-[#EBEBEB]">
      {/* Host Card */}
      <div className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-3xl p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Avatar & Badge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-[#EBEBEB]">
            <div className="relative mb-3">
              <img
                src={host.avatar}
                alt={host.name}
                className="w-24 h-24 rounded-full object-cover shadow-sm"
              />
              {host.isSuperhost && (
                <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1.5 rounded-full shadow-md">
                  <Award className="w-4 h-4" />
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-[#222222]">{host.name}</h3>
            <p className="text-sm font-semibold text-[#717171] mt-0.5">Superhost</p>

            {/* Quick stats in card */}
            <div className="grid grid-cols-3 divide-x divide-[#EBEBEB] w-full pt-6 mt-4 border-t border-[#EBEBEB] text-center">
              <div>
                <div className="font-bold text-lg text-[#222222]">{host.reviewsCount}</div>
                <div className="text-[11px] text-[#717171]">Reviews</div>
              </div>
              <div>
                <div className="font-bold text-lg text-[#222222] flex items-center justify-center gap-0.5">
                  <span>{host.rating.toFixed(2)}</span>
                  <Star className="w-3 h-3 fill-current text-[#222222]" />
                </div>
                <div className="text-[11px] text-[#717171]">Rating</div>
              </div>
              <div>
                <div className="font-bold text-lg text-[#222222]">{host.yearsHosting}</div>
                <div className="text-[11px] text-[#717171]">Years hosting</div>
              </div>
            </div>
          </div>

          {/* Right: Details & Bio */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-bold text-lg text-[#222222]">Host details</h4>
            <div className="space-y-2 text-sm text-[#222222]">
              <div>
                <span className="font-semibold">Response rate: </span>
                <span>{host.responseRate}</span>
              </div>
              <div>
                <span className="font-semibold">Responds: </span>
                <span>{host.responseTime}</span>
              </div>
              {host.languages && (
                <div>
                  <span className="font-semibold">Languages: </span>
                  <span>{host.languages.join(', ')}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-[#717171] leading-relaxed pt-2 border-t border-[#EBEBEB]">
              {host.bio}
            </p>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="mt-2 bg-white hover:bg-[#F7F7F7] text-[#222222] border border-[#222222] font-semibold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer active:scale-98"
            >
              Contact Host
            </button>
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 text-xs text-[#717171]">
        <ShieldCheck className="w-5 h-5 text-[#FF385C] shrink-0" />
        <p>
          To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
        </p>
      </div>

      {/* Contact Host Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
              <h3 className="text-xl font-bold text-[#222222]">Message {host.name}</h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isMessageSent ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-[#222222]">Message sent!</h4>
                <p className="text-sm text-[#717171]">
                  Elena usually responds within an hour. You'll receive an email notification when they reply.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={host.avatar}
                    alt={host.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#222222]">{host.name}</h4>
                    <p className="text-xs text-[#717171]">Typically responds {host.responseTime}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#717171] mb-1">
                    Your message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hi ${host.name}, I'm planning a stay and have a question about...`}
                    required
                    className="w-full border border-[#DDDDDD] rounded-xl p-3 text-sm text-[#222222] focus:outline-hidden focus:border-[#222222] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-4 py-2.5 text-sm font-semibold text-[#717171] hover:text-[#222222]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#222222] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Send message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
