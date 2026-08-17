import React from "react";
import { ShoppingBag, Star, CheckCircle } from "lucide-react";
import { Language, ShopItem, UserProfile } from "../types";
import { getLocalizedText, uiTranslations } from "../utils/i18n";

interface ShopViewProps {
  user: UserProfile;
  shopItems: ShopItem[];
  language: Language;
  onBuyItem: (itemId: string, price: number) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  user,
  shopItems,
  language,
  onBuyItem
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-amber-950 border border-purple-800/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>{uiTranslations.shopTitle[language]}</span>
            <ShoppingBag className="w-6 h-6 text-amber-400" />
          </h1>
          <p className="text-xs text-purple-200/80 mt-1">
            {language === "badini"
              ? "خالێن XP یێن تە بەدەستڤە ئیناین خەرج بکە بۆ کڕینا ناڤونیشان و نیشانێن ناوازە"
              : language === "ku"
              ? "خاڵەکانی XP کە بەدەستتهێناون خەرج بکە بۆ کڕینی ناونیشان و نیشانەی ناوازە"
              : "Redeem your hard-earned XP for exclusive avatar frames, titles, and powerups!"}
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-black text-sm flex items-center gap-2 shadow-lg">
          <Star className="w-5 h-5 fill-amber-400" />
          <span>{user.totalXp.toLocaleString()} XP Available</span>
        </div>
      </div>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {shopItems.map((item) => {
          const canAfford = user.totalXp >= item.priceXp;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl bg-[#16182e] border transition shadow-xl flex flex-col justify-between space-y-4 ${
                item.purchased
                  ? "border-emerald-500/40 bg-emerald-950/10"
                  : "border-indigo-900/30 hover:border-purple-500/40"
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-950 border border-indigo-800/40 flex items-center justify-center text-3xl mb-3 shadow-inner">
                  {item.icon}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white">
                  {getLocalizedText(item, "name", language)}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {getLocalizedText(item, "description", language)}
                </p>
              </div>

              <div>
                {item.purchased ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {language === "badini"
                        ? "کڕیایە"
                        : language === "ku"
                        ? "کڕدراوە"
                        : "Unlocked"}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => onBuyItem(item.id, item.priceXp)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                      canAfford
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
                        : "bg-indigo-950 text-slate-600 cursor-not-allowed border border-indigo-900/20"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {item.priceXp} XP -{" "}
                      {language === "badini"
                        ? "کڕین"
                        : language === "ku"
                        ? "کڕین"
                        : "Buy"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

