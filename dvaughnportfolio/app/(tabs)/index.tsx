import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const heroCopy = {
  brandName: 'Dvaughn House',
  headline: 'Less bureaucracy. More breakthroughs.',
  subheadline:
    'I’m a clinical research professional, tech autodidact, and vocalist who turns complex problems into structured, measurable wins—on the lab bench, on the web, and on stage.',
  primaryCta: 'Let’s build your next breakthrough',
  secondaryCta: 'See my projects',
  credibility: [
    'Big Pharma research experience, elevating data quality and site performance',
    'Educated at the University of Cincinnati and Xavier University',
    'Hands-on with Microsoft Office, Adobe Creative Suite, Apple Pro Apps, HTML/CSS',
  ],
  brandPillars: [
    {
      title: 'Research rigor',
      description: 'I safeguard data integrity, tighten protocols, and keep studies on track.',
    },
    {
      title: 'Systems thinking',
      description: 'I design and launch marketing and web systems that convert and scale.',
    },
    {
      title: 'Creative voice',
      description: 'I bring a performer’s clarity and presence to every story and product.',
    },
  ],
};

const navigationLinks = [
  { label: 'Services', anchor: 'services' },
  { label: 'Projects', anchor: 'projects' },
  { label: 'About', anchor: 'about' },
  { label: 'Contact', anchor: 'contact' },
];

const aboutCopy = {
  heading: 'I build results across three lanes—research, systems, and sound.',
  paragraphs: [
    'In Big Pharma research, I’ve championed site performance by proactively identifying and resolving issues before they become risks. My focus: protecting data integrity, elevating data quality, and giving teams the confidence to move fast without breaking what matters.',
    'As a tech autodidact, I architect lean, end-to-end growth systems—positioning, copy, design, site performance, analytics—then ship. I’ve launched business websites and operating frameworks that turn traffic into action with a structured, test-and-learn approach.',
    'As a vocalist, I translate complexity into feeling. Whether on stage or in the studio, I craft narratives that resonate—then bring that storytelling discipline back into research protocols, product launches, and marketing funnels.',
  ],
  closing: 'I don’t chase noise. I build systems that work.',
};

const LOGO_IMAGE = require('@/assets/dvaughnlogo01NOV2025.png');

export default function HomeScreen() {
  const [scrollY] = useState(() => new Animated.Value(0));
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const onScroll = useMemo(
    () =>
      Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: true,
        }
      ),
    [scrollY]
  );

  const gradientShift = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [0, 180],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          pointerEvents="none"
          style={[styles.gradientWrapper, { transform: [{ translateY: gradientShift }] }]}
        >
          <LinearGradient
            colors={['rgba(80,80,255,0.25)', 'transparent']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.gradientTop}
          />
          <LinearGradient
            colors={['transparent', 'rgba(80,80,255,0.15)']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.gradientBottom}
          />
        </Animated.View>

        <SafeAreaView style={[styles.safeArea, isDesktop && styles.safeAreaDesktop]}>
          <View style={[styles.navBar, isTablet && styles.navBarTablet]}>
            <View style={styles.brandRow}>
              <Image source={LOGO_IMAGE} style={styles.brandLogo} contentFit="contain" />
              <Text style={styles.brandName}>Dvaughn House</Text>
            </View>
            <View style={[styles.navLinks, !isTablet && styles.navLinksMobile]}>
              {navigationLinks.map((link) => (
                <Pressable
                  key={link.anchor}
                  style={({ pressed }) => [styles.navLink, pressed && styles.navLinkPressed]}
                >
                  <Text style={styles.navLinkText}>{link.label}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={({ pressed }) => [styles.navCta, pressed && styles.navCtaPressed]}>
              <Text style={styles.navCtaText}>Get in touch</Text>
            </Pressable>
          </View>

          <View style={[styles.heroRow, isDesktop && styles.heroRowDesktop]}>
            <View style={[styles.heroCopy, isDesktop && styles.heroCopyDesktop]}>
              <Text style={styles.heroEyebrow}>Crafting Digital Experiences</Text>
              <Text style={[styles.heroHeadline, isTablet && styles.heroHeadlineTablet]}>
                {heroCopy.headline}
              </Text>
              <Text style={[styles.heroSubheadline, isTablet && styles.heroSubheadlineTablet]}>
                {heroCopy.subheadline}
              </Text>
              <View style={styles.ctaRow}>
                <Pressable style={({ pressed }) => [styles.primaryCta, pressed && styles.primaryCtaPressed]}>
                  <Text style={styles.primaryCtaText}>{heroCopy.primaryCta}</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [styles.secondaryCta, pressed && styles.secondaryCtaPressed]}>
                  <Text style={styles.secondaryCtaText}>{heroCopy.secondaryCta}</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={[styles.credibility, isTablet && styles.credibilityTablet]}>
            {heroCopy.credibility.map((item) => (
              <View key={item} style={styles.credibilityItem}>
                <View style={styles.credibilityDot} />
                <Text style={styles.credibilityText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.pillars, isTablet && styles.pillarsTablet]}>
            {heroCopy.brandPillars.map((pillar) => (
              <View key={pillar.title} style={styles.pillarCard}>
                <Text style={styles.pillarTitle}>{pillar.title}</Text>
                <Text style={styles.pillarDescription}>{pillar.description}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.aboutSection, isDesktop && styles.aboutSectionDesktop]} id="about">
            <View style={styles.aboutContent}>
              <Text style={[styles.aboutHeading, isTablet && styles.aboutHeadingTablet]}>
                {aboutCopy.heading}
              </Text>
              {aboutCopy.paragraphs.map((paragraph) => (
                <Text key={paragraph} style={styles.aboutParagraph}>
                  {paragraph}
                </Text>
              ))}
              <Text style={styles.aboutClosing}>{aboutCopy.closing}</Text>
            </View>
          </View>
        </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
}

const GEORGIA = Platform.select({ ios: 'Georgia', default: 'Georgia' });

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#060608',
  },
  scrollContent: {
    paddingBottom: 96,
  },
  gradientWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height,
  },
  gradientTop: {
    height: 520,
    position: 'absolute',
    top: -260,
    left: -120,
    right: -120,
    borderRadius: 520,
  },
  gradientBottom: {
    height: 520,
    position: 'absolute',
    bottom: -260,
    left: -120,
    right: -120,
    borderRadius: 520,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.select({ ios: 16, android: 32, default: 24 }),
    gap: 32,
  },
  safeAreaDesktop: {
    paddingHorizontal: 48,
  },
  navBar: {
    backgroundColor: 'rgba(10,10,15,0.8)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  navBarTablet: {
    paddingHorizontal: 32,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  brandName: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: GEORGIA,
    letterSpacing: 0.6,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navLinksMobile: {
    display: 'none',
  },
  navLink: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  navLinkPressed: {
    opacity: 0.65,
  },
  navLinkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    fontFamily: GEORGIA,
  },
  navCta: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  navCtaPressed: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  navCtaText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: GEORGIA,
  },
  heroRow: {
    gap: 28,
  },
  heroRowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
  },
  heroCopy: {
    gap: 18,
  },
  heroCopyDesktop: {
    flex: 1,
  },
  heroEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
    fontFamily: GEORGIA,
  },
  heroHeadline: {
    color: '#ffffff',
    fontSize: 42,
    lineHeight: 48,
    fontFamily: GEORGIA,
  },
  heroHeadlineTablet: {
    fontSize: 54,
    lineHeight: 58,
  },
  heroSubheadline: {
    color: 'rgba(230,230,240,0.78)',
    fontSize: 17,
    lineHeight: 26,
    fontFamily: GEORGIA,
  },
  heroSubheadlineTablet: {
    fontSize: 19,
    lineHeight: 30,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
  primaryCta: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
  },
  primaryCtaPressed: {
    opacity: 0.85,
  },
  primaryCtaText: {
    color: '#090909',
    fontSize: 16,
    fontFamily: GEORGIA,
    fontWeight: '600',
  },
  secondaryCta: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 26,
    paddingVertical: 14,
  },
  secondaryCtaPressed: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  secondaryCtaText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: GEORGIA,
  },
  credibility: {
    gap: 12,
    marginTop: 12,
  },
  credibilityTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  credibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  credibilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  credibilityText: {
    color: 'rgba(220,220,230,0.85)',
    fontSize: 15,
    flex: 1,
    fontFamily: GEORGIA,
  },
  pillars: {
    gap: 16,
    marginTop: 16,
  },
  pillarsTablet: {
    flexDirection: 'row',
  },
  pillarCard: {
    flex: 1,
    backgroundColor: 'rgba(12,12,18,0.92)',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 10,
  },
  pillarTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: GEORGIA,
    fontWeight: '600',
  },
  pillarDescription: {
    color: 'rgba(210,210,220,0.8)',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: GEORGIA,
  },
  aboutSection: {
    marginTop: 32,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(12,12,18,0.95)',
    padding: 24,
    gap: 16,
  },
  aboutSectionDesktop: {
    padding: 40,
  },
  aboutContent: {
    gap: 18,
  },
  aboutHeading: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 34,
    fontFamily: GEORGIA,
  },
  aboutHeadingTablet: {
    fontSize: 34,
    lineHeight: 40,
  },
  aboutParagraph: {
    color: 'rgba(215,215,225,0.85)',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: GEORGIA,
  },
  aboutClosing: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 26,
    fontFamily: GEORGIA,
    fontStyle: 'italic',
  },
});
