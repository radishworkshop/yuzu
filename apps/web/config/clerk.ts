export const layoutAppearance = {
  elements: {
    // General & Sign in / Sign up
    card: 'bg-background shadow-lg rounded-lg border-border',
    headerTitle: 'text-primary',
    headerSubtitle: 'text-muted-foreground',
    dividerText: 'text-muted-foreground',
    formFieldLabel: 'text-primary',
    formFieldHintText: 'text-muted-foreground',
    formFieldInput: 'bg-primary-foreground border-border text-primary clerk-form-field-input accent-brand hover:accent-brand',
    otpCodeFieldInput: 'bg-primary-foreground ring-border border-border text-primary clerk-form-field-input accent-brand hover:accent-brand',
    formFieldInputShowPasswordButton: 'text-muted-foreground',
    formButtonPrimary: 'bg-brand hover:bg-brand hover:brightness-110',
    footerActionText: 'text-primary',
    footerActionLink: 'text-brand hover:text-brand hover:brightness-110',
    socialButtonsBlockButton: 'border-muted bg-muted/50 hover:bg-muted/50 text-primary',
    socialButtonsBlockButtonText: 'text-primary',

    selectOptionsContainer: 'bg-background border-border text-primary clerk-select-options-container',
    selectSearchInput: 'bg-background text-primary',

    // Avatar click
    userPreviewMainIdentifier: 'clerk-user-preview-main-identifier text-primary !important',
    userPreviewSecondaryIdentifier: 'text-muted-foreground !important',
    userButtonPopoverActionButton: 'hover:bg-muted',
    userButtonPopoverActionButtonText: 'text-primary',
    userButtonPopoverActionButtonIcon: 'text-muted-foreground',

    // Manage account
    navbarButton: 'text-primary opacity-100',
    navbarButtonIcon: 'opacity-100',
    navbarMobileMenuButton: 'text-primary',
    modalCloseButton: 'text-primary opacity-100',
    page: 'text-primary',
    profileSectionTitleText: 'text-primary',
    profileSectionTitle: 'border-border',
    accordionTriggerButton: 'text-primary clerk-accordion-trigger-button',
    profileSectionContent: 'text-primary clerk-profile-section-content',
    profileSectionPrimaryButton: 'text-primary',
    formFieldSuccessText: 'text-primary',
    formFieldWarningText: 'text-primary',

    alertText: 'text-primary',
    dividerLine: 'bg-border',

    form: 'clerk-form',
    avatarBox: 'clerk-avatar-box',
    accordionContent: 'clerk-accordion-content',
  },
  variables: {
    colorPrimary: "#f5a512",
    borderRadius: '0.2rem',
  },
}