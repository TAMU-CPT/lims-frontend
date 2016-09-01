import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Gravatar from 'react-gravatar'
import {Link} from 'react-router'
import SvgIconDomain from 'material-ui/svg-icons/social/domain';

var UserChip = React.createClass({
	render(){
		if(!this.props.person){
			return (<span>Unknown person</span>);
		}

		const divFlex = {
			display: 'flex',
			flexWrap: 'wrap',
		};

		return (
		<div style={divFlex}>
			<Link to={`/directory/users/${this.props.person.user}`} style={{textDecoration: 'none'}}>
				<Chip style={{cursor: 'auto'}}>
					<Avatar children={
						<Gravatar md5={this.props.person.gravatar_email} size={32}  style={{borderRadius: '50%'}}/>
					}/>
					{this.props.person.name}
				</Chip>
			</Link>
		</div>
		)
	}
});

var OrgChip = React.createClass({
	render() {
		const divFlex = {
			display: 'flex',
			flexWrap: 'wrap',
		};

		return (
		<div style={divFlex}>
			<Link to={`/directory/orgs/${this.props.org.id}`}>
				<Chip>
					<Avatar icon={<SvgIconDomain />} />
					{this.props.org.name}
				</Chip>
			</Link>
		</div>
		)
	}
});


export {OrgChip, UserChip};
