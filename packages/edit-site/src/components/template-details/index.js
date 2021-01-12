/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, __experimentalText as Text } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import isTemplateRevertable from '../../utils/is-template-revertable';
import { MENU_TEMPLATES } from '../navigation-sidebar/navigation-panel/constants';

export default function TemplateDetails( { template, onClose } ) {
	const { title, description } = useSelect(
		( select ) =>
			select( 'core/editor' ).__experimentalGetTemplateInfo( template ),
		[]
	);
	const { openNavigationPanelToMenu, revertTemplate } = useDispatch(
		'core/edit-site'
	);

	if ( ! template ) {
		return null;
	}

	const showTemplateInSidebar = () => {
		onClose();
		openNavigationPanelToMenu( MENU_TEMPLATES );
	};

	const revert = () => {
		revertTemplate( template );
		onClose();
	};

	return (
		<>
			<div className="edit-site-template-details">
				<Text variant="sectionheading">
					{ __( 'Template details' ) }
				</Text>

				{ title && (
					<Text variant="body">
						{ sprintf(
							/* translators: %s: Name of the template. */
							__( 'Name: %s' ),
							title
						) }
					</Text>
				) }

				{ description && (
					<Text variant="body">
						{ sprintf(
							/* translators: %s: Description of the template. */
							__( 'Description: %s' ),
							description
						) }
					</Text>
				) }
			</div>

			{ isTemplateRevertable( template ) && (
				<div className="edit-site-template-details">
					<Button isLink onClick={ revert }>
						{ __( 'Revert' ) }
					</Button>
					<Text variant="caption">
						{ __(
							'Reset this template to the theme supplied default'
						) }
					</Text>
				</div>
			) }

			<Button
				className="edit-site-template-details__show-all-button"
				onClick={ showTemplateInSidebar }
				aria-label={ __(
					'Browse all templates. This will open the template menu in the navigation side panel.'
				) }
			>
				{ __( 'Browse all templates' ) }
			</Button>
		</>
	);
}
