/**
 * Props for a section on the homepage. Title, children, optional extra class names.
 */
export default interface HomepageSectionProps {
    title: string;
    children: React.ReactNode;
    extraClassNames?: string;
    extraChildClassNames?: string;
}