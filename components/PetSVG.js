import React from 'react';
import Svg, {
  Ellipse, Circle, Polygon, Path, Rect, Line, Text as SvgText, G,
} from 'react-native-svg';
import { PET_TYPES } from '../constants';

/**
 * PetSVG — Detaylı kawaii evcil hayvan SVG bileşeni.
 *
 * Props:
 *   petType    {string}  — 'cat' | 'dog' | 'bunny' | 'hamster'
 *   face       {string}  — 'normal' | 'happy' | 'sick' | 'sleep' | 'sad'
 *   costume    {string}  — aktif kostüm id'si (ya da '')
 *   hat        {string}  — aktif şapka id'si (ya da '')
 *   neckItem   {string}  — aktif boyun aksesuarı emojisi (ya da '')
 *   showBubbles {bool}   — banyo köpük balonlarını göster
 */
const PetSVG = ({ petType = 'cat', face = 'normal', skinColor = '', eyeColor = '', showBubbles = false, xp = 0, mouthOpen = false }) => {
  const pt = PET_TYPES[petType] || PET_TYPES.cat;
  const body = skinColor || pt.bodyColor;
  const ear = pt.earColor;
  const tummy = pt.tummyColor;
  const eye = eyeColor || "#5C3D6B";

  const isHappy = face === 'happy';
  const isSick = face === 'sick';
  const isSleep = face === 'sleep';
  const isSad = face === 'sad';

  // Evrim Aşamaları (Stages)
  const isBaby = xp < 100;
  const isChild = xp >= 100 && xp < 300;
  const isTeen = xp >= 300 && xp < 800;
  const isAdult = xp >= 800 && xp < 1500;
  const isElder = xp >= 1500;

  // Boyutu sabitliyoruz (Her seviyede aynı, yavru modu kıvamında)
  const evoScale = 0.85; 
  const bodySize = 36;
  const headSize = 29;

  return (
    <Svg width={140} height={140} viewBox="0 0 140 140">
      <G transform={`scale(${evoScale})`} origin="70, 70">
        {/* ── Shadow ── */}
        <Ellipse cx="70" cy="125" rx={bodySize + 5} ry={8} fill="rgba(0,0,0,0.06)" />

        {/* ── Tail ── */}
        {petType === 'cat' && <Path d="M100 100 Q125 80 110 55 Q105 48 98 58 Q106 75 94 94Z" fill={body} />}
        {petType === 'dog' && <Path d="M98 95 Q118 105 108 85 Q102 78 96 88Z" fill={body} />}
        {petType === 'bunny' && <Circle cx="100" cy="105" r={bodySize/3} fill={body} />}

        {/* ── Body ── */}
        <Ellipse cx="70" cy="95" rx={bodySize} ry={bodySize - 3} fill={body} />
        <Ellipse cx="70" cy="103" rx={bodySize - 13} ry={bodySize - 13} fill={tummy} opacity="0.9" />

        {/* ── Front Paws ── */}
        <Ellipse cx="48" cy="123" rx={bodySize/3} ry={bodySize/4} fill={body} />
        <Ellipse cx="92" cy="123" rx={bodySize/3} ry={bodySize/4} fill={body} />

        {/* ── HEAD ── */}
        <Ellipse cx="70" cy="53" rx={headSize} ry={headSize - 2} fill={body} />

        {/* ── Ears ── */}
        {petType === 'cat' && (
          <G>
            <Path d="M45 35 L32 10 L58 30 Z" fill={body} />
            <Path d="M95 35 L108 10 L82 30 Z" fill={body} />
            <Path d="M46 33 L37 15 L55 28 Z" fill={ear} />
            <Path d="M94 33 L103 15 L85 28 Z" fill={ear} />
          </G>
        )}
        {petType === 'dog' && (
          <G>
            <Path d="M38 45 Q30 35 32 70 Q35 80 45 65 Z" fill={body} />
            <Path d="M102 45 Q110 35 108 70 Q105 80 95 65 Z" fill={body} />
          </G>
        )}
        {petType === 'bunny' && (
          <G>
            <Ellipse cx="55" cy="23" rx="8" ry="25" fill={body} rotation="-8" />
            <Ellipse cx="85" cy="23" rx="8" ry="25" fill={body} rotation="8" />
            <Ellipse cx="55" cy="23" rx="4" ry="18" fill={ear} rotation="-8" />
            <Ellipse cx="85" cy="23" rx="4" ry="18" fill={ear} rotation="8" />
          </G>
        )}
        {petType === 'hamster' && (
          <G>
            <Circle cx="45" cy="33" r="10" fill={body} />
            <Circle cx="95" cy="33" r="10" fill={body} />
            <Circle cx="45" cy="33" r="5" fill={ear} />
            <Circle cx="95" cy="33" r="5" fill={ear} />
          </G>
        )}

        {/* ── Blush ── */}
        <Ellipse cx="48" cy="67" rx="8" ry="4" fill="#FFB3C6" opacity="0.4" />
        <Ellipse cx="92" cy="67" rx="8" ry="4" fill="#FFB3C6" opacity="0.4" />

        {/* ── Eyes ── */}
        {(isSick || isSad) ? (
          <G>
            <Path d="M48 57 Q55 55 62 57" stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round" />
            <Path d="M78 57 Q85 55 92 57" stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round" />
          </G>
        ) : isSleep ? (
          <G>
            <Path d="M48 57 Q55 63 62 57" stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round" />
            <Path d="M78 57 Q85 63 92 57" stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round" />
          </G>
        ) : isHappy ? (
          <G>
            <Path d="M48 59 Q55 49 62 59" stroke={eye} strokeWidth="4" fill="none" strokeLinecap="round" />
            <Path d="M78 59 Q85 49 92 59" stroke={eye} strokeWidth="4" fill="none" strokeLinecap="round" />
          </G>
        ) : (
          <G>
            <Circle cx="55" cy="57" r="7" fill={eye} />
            <Circle cx="85" cy="57" r="7" fill={eye} />
            <Circle cx="57" cy="54" r="2.5" fill="white" />
            <Circle cx="87" cy="54" r="2.5" fill="white" />
          </G>
        )}

        {/* ── Nose ── */}
        <Ellipse cx="70" cy="63" rx="4" ry="3" fill="#FF6B9D" />

        {/* ── Mouth ── */}
        {mouthOpen ? (
          <Circle cx="70" cy="73" r="10" fill="#5C3D6B" />
        ) : (
          <Path d="M64 69 Q70 75 76 69" stroke="#FF6B9D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* ── Bubbles ── */}
        {showBubbles && (
          <G opacity=".7">
            <Circle cx="45" cy="35" r="6" fill="white" stroke="#74C0FC" strokeWidth="1" />
            <Circle cx="95" cy="25" r="5" fill="white" stroke="#74C0FC" strokeWidth="1" />
            <Circle cx="70" cy="20" r="4" fill="white" stroke="#74C0FC" strokeWidth="1" />
            <Circle cx="30" cy="60" r="7" fill="white" stroke="#74C0FC" strokeWidth="1.5" />
            <Circle cx="110" cy="65" r="6" fill="white" stroke="#74C0FC" strokeWidth="1.2" />
          </G>
        )}
      </G>
    </Svg>
  );
};

export default PetSVG;
