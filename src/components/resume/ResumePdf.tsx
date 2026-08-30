import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Resume, Entry } from "@/lib/resume-data";

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 34,
    fontSize: 8.5,
    color: "#262626",
    fontFamily: "Helvetica",
  },
  name: { fontSize: 22, fontFamily: "Times-Bold", textTransform: "uppercase" },
  role: { fontSize: 11, fontFamily: "Times-Bold", color: "#404040", marginTop: 3 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 6 },
  contactItem: { fontSize: 7.5, color: "#525252", marginRight: 12 },
  columns: { flexDirection: "row", marginTop: 14 },
  leftCol: { flexGrow: 1.35, flexBasis: 0, paddingRight: 16 },
  rightCol: { flexGrow: 1, flexBasis: 0 },
  heading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1.5,
    paddingBottom: 3,
    marginBottom: 6,
  },
  section: { marginBottom: 12 },
  entry: { marginBottom: 9 },
  entryTitle: { fontSize: 10, fontFamily: "Times-Bold" },
  entrySubtitle: { fontSize: 8, color: "#525252", marginTop: 1 },
  entryMeta: { fontSize: 7.5, color: "#737373", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2.5 },
  bulletDot: { width: 8, fontSize: 8, color: "#737373" },
  bulletText: { flex: 1, fontSize: 7.6, lineHeight: 1.45, color: "#404040" },
  summary: { fontSize: 7.6, lineHeight: 1.5, color: "#404040" },
  skillLabel: { fontSize: 8.2, fontFamily: "Helvetica-Bold" },
  skillItems: { fontSize: 7.4, lineHeight: 1.55, color: "#404040", marginTop: 1 },
  simpleTitle: { fontSize: 8, fontFamily: "Helvetica-Bold" },
  simpleSubtitle: { fontSize: 7.2, color: "#737373", marginTop: 1, lineHeight: 1.4 },
  simpleBlock: { marginBottom: 6, paddingBottom: 4, borderBottomWidth: 0.5, borderBottomColor: "#d4d4d4", borderStyle: "dashed" },
  language: { fontSize: 8, paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: "#d4d4d4", borderStyle: "dashed" },
});

function Heading({ children, accent }: { children: string; accent: string }) {
  return <Text style={[styles.heading, { color: accent, borderBottomColor: accent }]}>{children}</Text>;
}

function EntryBlockPdf({ entry }: { entry: Entry }) {
  return (
    <View style={styles.entry} wrap={false}>
      <Text style={styles.entryTitle}>{entry.title}</Text>
      {entry.subtitle ? <Text style={styles.entrySubtitle}>{entry.subtitle}</Text> : null}
      {entry.meta || entry.location ? (
        <Text style={styles.entryMeta}>{[entry.meta, entry.location].filter(Boolean).join("  ·  ")}</Text>
      ) : null}
      {entry.bullets.filter(Boolean).map((b, i) => (
        <View key={i} style={styles.bullet}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

export function ResumePdf({ data }: { data: Resume }) {
  return (
    <Document title={`${data.name} - Resume`} author={data.name}>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>
          <View style={styles.contactRow}>
            {[data.phone, data.email, data.linkedin, data.github, data.location]
              .filter(Boolean)
              .map((c, i) => (
                <Text key={i} style={styles.contactItem}>
                  {c}
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.columns}>
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <Heading accent={data.accent}>{data.summaryTitle}</Heading>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
            {data.experience.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Professional Experience</Heading>
                {data.experience.map((e) => (
                  <EntryBlockPdf key={e.id} entry={e} />
                ))}
              </View>
            )}
            {data.projects.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Projects</Heading>
                {data.projects.map((p) => (
                  <EntryBlockPdf key={p.id} entry={p} />
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightCol}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Technical Skills</Heading>
                {data.skills.map((g) => (
                  <View key={g.id} style={{ marginBottom: 7 }} wrap={false}>
                    <Text style={styles.skillLabel}>{g.label}</Text>
                    <Text style={styles.skillItems}>{g.items.filter(Boolean).join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.certifications.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Certifications</Heading>
                {data.certifications.map((c) => (
                  <View key={c.id} style={styles.simpleBlock} wrap={false}>
                    <Text style={styles.simpleTitle}>{c.title}</Text>
                    <Text style={styles.simpleSubtitle}>{c.subtitle}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.achievements.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Key Achievements</Heading>
                {data.achievements.map((a) => (
                  <View key={a.id} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={styles.simpleTitle}>{a.title}</Text>
                    <Text style={styles.simpleSubtitle}>{a.subtitle}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Education</Heading>
                {data.education.map((e) => (
                  <View key={e.id} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={[styles.simpleTitle, { fontFamily: "Times-Bold", fontSize: 8.5 }]}>{e.title}</Text>
                    <Text style={styles.simpleSubtitle}>{e.subtitle}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.languages.length > 0 && (
              <View style={styles.section}>
                <Heading accent={data.accent}>Languages</Heading>
                {data.languages.filter(Boolean).map((l, i) => (
                  <Text key={i} style={styles.language}>
                    {l}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
